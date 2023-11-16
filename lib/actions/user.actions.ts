"use server"

import { connectToDB } from '../mongoose'
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import { FilterQuery, SortOrder } from 'mongoose';

interface Props {
    userId : string;
    username : string;
    name : string;
    bio : string;
    image : string;
    path : string;
}

export async function UpdateUser({userId, username, name ,bio ,image ,path, } : Props) : Promise<void> {
    connectToDB();
    
    try {
        
        await User.findOneAndUpdate(
            { id : userId},
            { 
                username : username.toLowerCase(),
                name,
                bio,
                image,
                onboarded : true,
            },
            { upsert : true},
        )
        
        if (path === '/profile/edit') {
            revalidatePath(path);
        }
        
        
    } catch (error : any ) {
        throw new Error("Failed to create/update user : ",error.message )
    }
}

export const fetchUser = async (userId : string) => {
    try {
        await connectToDB()
        return await User.findOne({ id : userId })
        // return await User.findById(userId)
            // .populate({
            //     path : 'communities',
            //     model : Community
            // }); 
        
    } catch (error : any) {
        console.log("Failed to fetch user :",error.message);
    }
}

export const fetchUserPost = async (userId : string ) => {
    try {
        
        await connectToDB();
        
        const threads = await User.findOne({id : userId }).populate({
            path : 'threads',
            model : Thread,
            populate : {
                path : 'children',
                model : Thread,
                populate : {
                    path : 'author',
                    model : User,
                    select: 'name image id _id'
                }
            }
        })
        return threads
    } catch (error : any) {
        console.log("Failed to fetch user :",error.message);
    }
}

interface PropsFetchUsers {
    userId : string;
    sortBy?: SortOrder;
    pageNumber?: number;
    pageSize?: number;
    searchString?: string;
}

export async function fetchUsers({
    sortBy='desc',
    pageNumber=1,
    pageSize=20,
    searchString = "",
    userId} : PropsFetchUsers
) {
    try {
        connectToDB();
        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString, "i")
        
        const query:FilterQuery<typeof User> = {
            id : {$ne : userId},
        }
        
        if (searchString.trim() !== "") {
            query.$or = [
                {username : {$regex : regex } },
                {name : {$regex : regex } },
                
            ]
        }
        
        const sortOptions = { createAt : sortBy };
        const usersQuery =  User.find(query).sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize)
        
        const totalUsersCount = await User.countDocuments(query); 
        const users = await usersQuery.exec()
        
        const isNext = totalUsersCount > skipAmount + users.length;
        
        return {users, isNext}
        
    } catch (error : any) {
        console.log("Failed to fetch user :",error.message);
    }
}