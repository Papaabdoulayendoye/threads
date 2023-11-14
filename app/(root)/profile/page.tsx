"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { currentUser, useSession } from '@clerk/nextjs';

const page = async () => {
    const searchParams = useSearchParams()
    
    const id = searchParams.get('id')
    console.log("id");
    console.log(id);
    
    const user = await currentUser()
    return (
        <div>
            <h1 className='text-white'>Current userID = {user?.id} </h1>
        </div>
    )
}

export default page
