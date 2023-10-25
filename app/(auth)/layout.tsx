import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

const inter = Inter( {subsets : ['latin']})

export const metadata: Metadata = {
    title: 'Threads',
    description: 'A Next.js 13 Meta Threads Application',
}

export default function RootLayout({ children }: PropsWithChildren ) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1 flex items-center justify-center min-h-screen`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
