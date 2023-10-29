import Image from 'next/image';
import Link from 'next/link';

interface Props {
    id : string ;
    currentUserId : string ;
    parrentId : string ;
    author : {
        name : string;
        image : string;
        id : string;
    }
    text : string ;
    community : {
        id : string;
        name : string;
        image : string;
    } | null ;
    createAt : string ;
    comments : {
        author : {
            image : string;
        }
    }[] ;
    isComment ?: boolean;
}

const ThreadCard = ({id, currentUserId, parrentId, author, text, community, createAt, comments, isComment} : Props) => {
    
    return (
        <article className='flex w-full flex-col rounded-xl bg-dark-2 p-7 mb-7'>
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative h-[50px] w-[50px] flex items-center justify-center'>
                            <Image alt='profile image' fill src={author.image} 
                            className='cursor-pointer rounded-full object-cover' quality={100} />
                        </Link>
                        
                        <div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800' />
                    </div>
                    
                    <div className='flex -w-full flex-col'>
                        <Link href={`/profile/${author.id}`} className='w-fit'>
                            <h4 className=' cursor-pointer text-base-semibold text-light-1'>{author?.name}</h4>
                        </Link>
                        
                        <p className='mt-2 text-small-regular text-light-2' >{text}</p>
                        <div className='mt-5 flex flex-col gap-3'>
                            <div className='flex gap-3.5'>
                                <Image src={'/heart-gray.svg'} alt='heart' width={24} height={24} className=' cursor-pointer object-contain' />
                                <Link href={`/thread/${id}`}>
                                    <Image src={'/reply.svg'} alt='reply' width={24} height={24} className=' cursor-pointer object-contain' />
                                </Link>
                                <Image src={'/repost.svg'} alt='repost' width={24} height={24} className=' cursor-pointer object-contain' />
                                <Image src={'/share.svg'} alt='share' width={24} height={24} className=' cursor-pointer object-contain' />
                            </div>
                            
                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-gray-1'>{comments?.length} replies</p>
                                </Link>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ThreadCard
