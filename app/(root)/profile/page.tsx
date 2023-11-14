import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from '@clerk/nextjs';

const page = () => {
    const searchParams = useSearchParams()
    const paramsID = searchParams.get('id')
    
    return (
        <div>
            <h1>Current userID = {paramsID} </h1>
        </div>
    )
}

export default page
