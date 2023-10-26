import { OrganizationSwitcher, SignIn, SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import {dark} from "@clerk/themes";
const Tobar = () => {
    return (
        <nav className='fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3'>
            
            <Link href={'/'} className='flex items-center gap-4'>
                <Image src={'/logo.svg'} height={30} width={30} alt='logo' />
                <p className='text-light-1 max-xs:hidden text-heading3-bold'>Threads</p>
            </Link>
            <div className='flex items-center gap-1'>
                
                <div className='block md:hidden'>
                    <SignedIn>
                        <SignOutButton>
                            <div className='flex cursor-pointer'>
                                <Image alt='logout' width={24} height={24} src={'/logout.svg'}  />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher  appearance={{
                        baseTheme : dark,
                        elements : { 
                            organizationSwitcherTrigger : "py-2 px-4"
                        },
                    }} /> 
                
            </div>
            
        </nav>
    )
}

export default Tobar
