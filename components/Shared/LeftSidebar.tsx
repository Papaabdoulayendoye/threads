"use client"

import Link from 'next/link'
import {sidebarLinks} from '@/constants'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs'
const LeftSidebar =  () => {
    const router = useRouter()
    const getPathName = usePathname()
    
    const { userId } = useAuth()
    
    return (
        <section className='sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden custom-scrollbar'>
            <div className='flex w-full flex-1 flex-col gap-6 px-6'>
                {sidebarLinks.map(link => {
                const isActive = 
                    (getPathName.includes(link.route) && link.route.length > 1 )
                    || 
                    getPathName === link.route
                
                return (
                        <Link key={link.label} href={link.route === '/profile' ? 
                            `${link.route}/${userId}` : link.route} 
                            className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-primary-500'}`}
                        >
                            <Image
                                src={link.imgURL} 
                                alt={`${link.label} image`} 
                                height={24} width={24} 
                            />
                            <span className='text-light-1 max-lg:hidden'>{link.label}</span>
                        </Link>
                    )
                } 
                )}
            </div>
            
            <div className='mt-10 px-6'>
                    <SignedIn>
                        <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                            <div className='flex cursor-pointer p-4 gap-4'>
                                <Image alt='logout' width={24} height={24} src={'/logout.svg'}  />
                                <p className='text-light-2 max-lg:hidden'>Log out</p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
            </div>
            
        </section>
    )
}

export default LeftSidebar
