import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation'
import {fetchUser} from '@/lib/actions/user.actions'


const page = async () => {
    const user = await currentUser()
    
    if (!user) return null;
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    return (
        <div>
            <h1 className='text-white'>Current userID = {user?.id} </h1>
        </div>
    )
}

export default page
