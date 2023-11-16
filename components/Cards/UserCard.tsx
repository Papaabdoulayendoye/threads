"use client"
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
    key : string ;
    id : string ;
    imgURL : string ;
    name : string ;
    username : string ;
    personType : string ;
    bio : string ;
}

const UserCard = ({key ,id ,imgURL ,name ,username ,personType,bio}: Props ) => {
    const router = useRouter()
    return (
        <article className='flex flex-col justify-between gap-4 max-xs: rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center'>
            <div className='flex flex-1 items-start justify-start gap-3 xs:items-center'>
                <div className='h-12 w-12 relative'>
                    <Image
                        src={imgURL}
                        alt='logo'
                        fill
                        className='rounded-full object-cover'
                    />
                </div>
                <div className='flex-1 text-ellipsis'>
                    <h4 className='text-base-semibold text-light-1'>{name}</h4>
                    <p className='text-small-medium text-gray-1'>@{username}</p>
                </div>
            </div>
            
            <Button className='h-auto min-w-[74px] rounded-lg bg-primary-500 text-[12px] text-light-1'
            onClick={() => router.push(`/profile/${id}`)}
            >
                View
            </Button>
            
        </article>
    )
}

export default UserCard
