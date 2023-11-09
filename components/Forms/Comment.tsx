"use client"

import { useState, ChangeEvent } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    
} from "@/components/ui/form"
import * as z from 'zod'
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from '@/lib/validations/thread';
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';
// import { createThread } from '@/lib/actions/thread.actions';

interface Props {
    threadId : string ;
    currentUserImg : string;
    currentUserId : string;
}


const Comment = ({threadId, currentUserImg, currentUserId} : Props) => {
        const [submitting, setsubmitting] = useState<boolean>(false)
        const pathName = usePathname()
        const router = useRouter()
        const form = useForm({
            resolver : zodResolver(CommentValidation),
            defaultValues : {
                thread : '',
            }
        })
        
        const onSubmit : any = async (values : z.infer<typeof CommentValidation>) => {
            setsubmitting(true)
            await addCommentToThread({
                threadId : threadId,
                commentText : values.thread,
                userId : JSON.parse(currentUserId),
                path : pathName
            })
            setsubmitting(false)
            router.push('/')
        }
return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
                className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col">
                
                <FormField
                    control={form.control}
                    name="thread"
                    render=
                    {({ field }) => (
                        <FormItem className='flex items-center w-full gap-3'>
                            <Image src={currentUserImg} alt='user profile'
                                width={48} height={48}
                                className='rounded-full object-cover !h-[48px] !w-[48px]'
                            />
                        <FormControl  className='border-none bg-transparent'>
                            <Input type="text" placeholder="Comment..."
                            className='focus-visible: ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-light-1 outline-none'
                            {...field}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" 
                    className='rounded-3xl 
                    bg-primary-500 
                    px-8 py-2 !text-small-regular 
                    text-light-1 max-xs:w-full'
                >Reply {submitting ? '...' : ''}</Button>
            </form>
        </Form>
    )
}

export default Comment
