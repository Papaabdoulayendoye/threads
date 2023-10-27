import { fetchPost } from '@/lib/actions/thread.actions';

export default async function Home() {
    const result = await fetchPost(1,30);
    console.log("result");
    console.log(result);
    
    return (
    <>
        <div className=''>
            <h1 className='text-left text-heading2-bold text-light-1'>Home</h1>
        </div>
    </>
    )
}