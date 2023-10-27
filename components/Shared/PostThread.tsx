"use client"

import { useState, ChangeEvent } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';

interface Props {
    user : {
        id : string;
        objectId : string;
        username : string;
        name : string;
        bio : string;
        image : string;
    },
    btnTitle : string;
}

const PostThread = ({ userId } : {userId : string} ) => {
        const [submitting, setsubmitting] = useState<boolean>(false)
        const pathName = usePathname()
        const router = useRouter()
        
        const form = useForm({
            resolver : zodResolver(ThreadValidation),
            defaultValues : {
                thread : '',
                accountId : userId
            }
        })
        const onSubmit : any = async (values : z.infer<typeof ThreadValidation>) => {
            await createThread({
                text : values.thread,
                author : values.accountId,
                path : pathName,
                communityId : null
            })
            
            router.push('/')
            
        }
        
    return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
                className="mt-10 flex flex-col justify-start gap-10">
                
                <FormField
                    control={form.control}
                    name="thread"
                    render=
                    {({ field }) => (
                        <FormItem className='flex flex-col w-full gap-3'>
                        <FormLabel className='text-base-semibold text-light-2 px-4'>
                            Create Thread 
                        </FormLabel>
                        <FormControl  className='flex-1 text-base-semibold text-gray-200'>
                            <Textarea className=' resize-none border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent !focus-visible:ring-offset-0' rows={15}
                            {...field}
                            >
                            
                            </Textarea>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                
                />
                
                
                <Button type="submit" 
                    className='bg-primary-500'
                    size={'lg'}
                >Submit</Button>
            </form>
        </Form>
    )
}
export default PostThread;
