import { fetchUserPost } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ThreadCard from '../Cards/ThreadCard';

interface Props {
    currentUserId : string ;
    accountId : string ;
    accountType : string ;
}

const ThreadsTab = async ({currentUserId ,accountId ,accountType } : Props) => {
    let result = await fetchUserPost(accountId);
    if (!result) redirect('/')
    
    return (
        <section className='mt-9 flex flex-col gap-10'>
            {result?.threads.map( (thread : any ) => {
                return (
                    <ThreadCard
                        key={thread._id}
                        id={thread?._id}
                        currentUserId={currentUserId}
                        parrentId={thread?.parrentId}
                        author={
                            accountType === 'User' ? 
                                {name : result?.name, image : result?.image , id : result?.id} :
                                {name : thread?.autho?.name, image : thread?.autho?.image , id : thread?.autho?.id}
                        }
                        text={thread?.text}
                        community={thread?.community}
                        createAt={thread?.createAt}
                        comments={thread?.comments}
                    />
                )
            })}
        </section>
    )
}

export default ThreadsTab
