import React from 'react'
import { useSearchParams } from 'next/navigation'

interface Props {
    params : string;
}

const page = ({ params } : Props) => {
    const searchParams = useSearchParams()
    const paramsID = searchParams.get('id')
    
    return (
        <div>
            <h1>return id = {paramsID} </h1>
        </div>
    )
}

export default page
