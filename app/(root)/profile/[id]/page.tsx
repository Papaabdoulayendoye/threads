import { useSearchParams,redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import { fetchUser } from '@/lib/actions/user.actions'
import ProfileHeader from '@/components/Shared/ProfileHeader'
import { Tabs, TabsContent , TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/constants'
import ThreadsTab from '@/components/Shared/ThreadsTab'

interface Props {
    params : {
        id : string,
    }
}

const page = async (  { params } : Props ) => {
    const user = await currentUser() 
    if (!user) return null;
    
    const userInfo = await fetchUser(params?.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    
    return (
        <div>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user?.id}
                name={userInfo?.name}
                username={userInfo.username}
                imgURL={userInfo.image}
                bio={userInfo.bio}
            />
            
            <div className='mt-9'>
                <Tabs defaultValue='threads' className='w-full'>
                    <TabsList className='tab'>
                        {profileTabs.map( tab => {
                            return (
                                <TabsTrigger key={tab?.label} className='tab' value={tab?.value}>
                                    <Image 
                                    alt={tab.label}
                                    src={tab.icon}
                                    width={20}
                                    height={20}
                                    className=' object-contain '
                                    />
                                    <p className=''>{tab.label}</p>
                                    
                                    {tab?.label === 'Threads' && (
                                        <p className='text-light-2 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium'>{userInfo?.threads?.length}</p>
                                    )}
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>
                    
                    {profileTabs.map( tab => {
                        return (
                            <TabsContent value={tab.value} key={`content-${tab?.label}`} className=' w-full text-light-1'>
                                <ThreadsTab
                                    currentUserId={user?.id}
                                    accountId={userInfo?.id}
                                    accountType='User'
                                />
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
            
        </div>
    )
}

export default page
