"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'

interface Props {
    params : {
        id : string,
    }
}

const page = (  { params } : Props ) => {
    const searchParams = useSearchParams()
    const userName = searchParams.get('name')
    console.log("params");
    console.log(params?.id);
    console.log("username");
    console.log(userName);
    
    return (
        <div>
            <h1 className=' text-light-1'>return id = {params?.id} from {userName} </h1>
        </div>
    )
}

export default page
