import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

import Tobar from '@/components/Shared/Tobar'
import LeftSidebar from '@/components/Shared/LeftSidebar'
import RightSidebar from '@/components/Shared/RightSidebar'
import Bottombar from '@/components/Shared/Bottombar'


const inter = Inter({subsets : ['latin']})

export const metadata: Metadata = {
    title: 'Threads',
    description: 'A Next.js 13 Meta Threads Application',
        icons : {
            icon : 'logo.svg'
        }
}

export default function RootLayout({ children }: PropsWithChildren ) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Tobar />
                    <main className='flex flex-rows'>
                        <LeftSidebar />
                        <section className='flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10'>
                            <div className='w-full max-w-4xl'>
                                {children}
                            </div>
                        </section>
                        <RightSidebar />
                    </main>
                    <Bottombar />
                </body>
            </html>
        </ClerkProvider>
    )
}
