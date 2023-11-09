import ThreadCard from '@/components/Cards/ThreadCard'
import Comment from '@/components/Forms/Comment';
import { fetchThread } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import Thread from '@/lib/models/thread.model';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const page = async ( { params } : {params : {id : string} }) => {
    
    
    if (!params?.id) {
        return null;
    }
    
    const user = await currentUser() 
    if (!user) {
        return null;
    }
    
    
    const userInfo = await fetchUser(user?.id)
    if (!userInfo?.onboarded) {
        redirect('/onboarding')
    }
    
    const thread = await fetchThread(params.id)
    
    
    return (
        <section className='relative'>
            <div>
                <ThreadCard
                        key={thread._id}
                        id={thread?._id}
                        currentUserId={user?.id || ""}
                        parrentId={thread?.parrentId}
                        author={thread?.author}
                        text={thread?.text}
                        community={thread?.community}
                        createAt={thread?.createAt}
                        comments={thread?.children}
                    />
            </div>
            
            <div className='mt-7'>
                <Comment
                threadId={thread?.id}
                currentUserImg={userInfo.image}
                currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className='mt-10'>
                {thread?.children.map((childItem : any) => {
                    return (
                    <ThreadCard
                        key={childItem._id}
                        id={childItem?._id}
                        currentUserId={childItem?.parentId || ""}
                        parrentId={childItem?.parrentId}
                        author={childItem?.author}
                        text={childItem?.text}
                        community={childItem?.community}
                        createAt={childItem?.createAt}
                        comments={childItem?.children}
                        isComment
                    />
                )
                })}
            </div>
        </section>
    )
}

export default page
