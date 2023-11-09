import AccountProfile from '@/components/Forms/AccountProfile'
import { currentUser } from "@clerk/nextjs";


const Onboarding = async () => {
    const User = await currentUser()
    
    const userInfo = {
        _id : '',
        username : '',
        name : '',
        bio : '',
        image : ''
    }
    
    const UserData = {
        id : User?.id,
        objectId : userInfo?._id,
        username : userInfo?.username || User?.username,
        name : userInfo?.name || User?.firstName || '',
        bio : userInfo?.bio || '',
        image : userInfo?.image || User?.imageUrl
    }
    
    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='text-heading2-bold text-light-1'>Onboarding</h1>
            <p className=' text-base-regular mt-3 text-light-2'>Complete your profile now to use Threads</p>
            
            <section className='mt-9 bg-dark-2 p-10'>
                <AccountProfile user={UserData} btnTitle='Continue'/>
            </section>
            
        </main>
    )
}

export default Onboarding
