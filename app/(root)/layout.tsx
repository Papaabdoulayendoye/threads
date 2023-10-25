import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'


export const metadata: Metadata = {
    title: 'Threads',
    description: 'A Next.js 13 Meta Threads Application',
}

export default function RootLayout({ children }: PropsWithChildren ) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
