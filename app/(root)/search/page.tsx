import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import UserCard from '@/components/Cards/UserCard'


const page = async () => {
    const user = await currentUser() 
    if (!user) return null;
    const userInfo = await fetchUser(user?.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    
    const result = await fetchUsers({
        userId : user.id,
        pageNumber: 1,
        pageSize : 25,
        searchString : ''
    })
    
    return (
        <section>
            <h1 className='text-light-1 text-heading2-semibold mb-10'>Search</h1>
            
            
            
            <div className='mt-14 flex flex-col gap-9'>
                {result?.users?.length === 0 ? (
                    <p className='text-center !text-base-regular text-light-3'>No users</p>
                ) : (
                    <>
                        {result?.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                imgURL={person.image}
                                name={person.name}
                                username={person.username}
                                bio={person.bio}
                                personType="User"
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default page