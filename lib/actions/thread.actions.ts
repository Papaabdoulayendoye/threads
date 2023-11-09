"use server"

import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
    text : string;
    author : string;
    communityId : string | null;
    path : string
}


export async function createThread({text, author, communityId, path} : Params) {
    
    await connectToDB();
    
    try {
        const createdThread = await Thread.create({
            text,
            author,
            community : null,
        })
        await User.findByIdAndUpdate(author, {
            $push : {threads : createdThread._id}
        })
        // createdThread.save()
        
        revalidatePath(path);
    } catch (error : any) {
        throw new Error("Failed to create a thread",error.message)
    }
    
}

export async function fetchPost(pageNumber = 1, pageSize = 20) {
    await connectToDB();
    
    // calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize
    
    try 
    {
        // Fetch posts that have no parents (top - level...)
        const postsQuery = Thread.find({ parentId : {$in :[ null, undefined ]}}).sort({createAt : 'desc'}).skip(skipAmount).limit(pageSize).populate({path : 'author', model : User }).populate({path : 'children', populate : { path : 'author', model : User, select : "_id name parentId image" }
            })
        
        const totalPostCount = await Thread.countDocuments({parentId : {$in :[ null, undefined ]}})
        
        const posts = await postsQuery.exec();
        const isNext = totalPostCount > skipAmount + posts.length;
        
        return {posts, isNext}
        
    }catch (error : any) {
        throw new Error("Failed to fetch threads",error.message)
        console.log("Error : ", error.message);
        
    }
}

export const fetchThread = async (id : string) => {
    await connectToDB();
    
    try {
        
        const thread = await Thread.findById(id).populate({
            path : 'author',
            model : User,
            select : '_id id name image'
        }).populate({
            path : 'children',
            populate : [
                {
                    path : 'author',
                    model : User,
                    select : "_id id name image"
                },
                {
                    path : 'children',
                    model : Thread,
                    populate : {
                        path : 'author',
                        model : User,
                        select : "_id id name image"
                    }
                }
            ]
        }).exec()
        
        
        return thread;
        
    } catch (error:any) {
        throw new Error("Failed to fetch Thread",error.message);
    }
}


interface ParamsComment {
    threadId : string;
    commentText : string;
    userId : string ;
    path : string
}

export async function addCommentToThread( {threadId , commentText , userId , path} : ParamsComment){
    await connectToDB();
    
    try {
        
        
        const originalThread = await Thread.findById(threadId)
        
        if (!originalThread) throw new Error("Thread not found")
        
        const commentThread = new Thread({
            text : commentText,
            author : userId,
            parentId : threadId,
            
        })
        
        const saveCommentThread = await commentThread.save()
        
        originalThread.children.push(saveCommentThread._id)
        await originalThread.save()
        
        revalidatePath(path)
        
    } catch (error : any) {
        throw new Error("Error adding comment to thread :",error.message)
        
    }
}










