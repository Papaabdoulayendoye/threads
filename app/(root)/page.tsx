import ThreadCard from '@/components/Cards/ThreadCard';
import { fetchPost } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
    const result = await fetchPost(1,30);
    const user = await currentUser()
    if (!user?.id) {
        redirect('/sign-in')
    }
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    
    return (
        <div className=''>
            <h1 className='text-left text-heading2-bold text-light-1'>Home</h1>
            
            <section className='mt-9 flex flex-col gap-10'></section>
            {result?.posts.length === 0 ? (
                <p className='text-center !text-base-regular text-light-3'>No threads found</p>
            ): (
            <>
                {result?.posts.map(post => (
                    <ThreadCard
                        key={post._id}
                        id={post?._id}
                        currentUserId={user?.id || ""}
                        parrentId={post?.parrentId}
                        author={post?.author}
                        text={post?.text}
                        community={post?.community}
                        createAt={post?.createAt}
                        comments={post?.comments}
                    />
                ))}
            </>
            )}
        </div>
    )
}