"use client"
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from '@/lib/validations/user';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import Image from 'next/image';

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

const AccountProfile = ({user, btnTitle} : Props) => {
    
    // const [submitting, setsubmitting] = useState<boolean>(false)
    const form = useForm({
        resolver : zodResolver(UserValidation),
        defaultValues : {
            profile_photo : user?.image || '',
            name : user?.name || '' ,
            username : user?.username || '' ,
            bio : user?.bio || '',
        }
    })
    
    const handleImage = (e:ChangeEvent,fieldChange:(value :string) => void) => {
        e.preventDefault()
    }
    const onSubmit = (values : z.infer<typeof UserValidation>) => {
        console.log(values)
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col justify-start gap-10">
                <FormField
                control={form.control}
                name="profile_photo"
                render={({ field }) => (
                    <FormItem className='flex items-center w-full gap-3'>
                    <FormLabel className='flex h-24 w-24 items-center justify-center rounded-full bg-dark-4 !important'>
                        {field?.value ? (
                        <Image src={field.value} alt='profile_photo' width={96} height={96}
                        className='rounded-full !object-cover' priority />) :
                        
                        (
                        <Image src={'/profile.svg'} alt='profile_photo' width={24} height={24} className='object-contain'/>
                    )}</FormLabel>
                    <FormControl  className=' cursor-pointer flex-1 text-base-semibold text-gray-200'>
                        <Input type='file' accept='image/' placeholder='Upload image'
                            className='cursor-pointer border-none bg-transparent outline-none file:text-blue'
                            onChange={(e) => handleImage(e,field.onChange)}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
                
                
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className=' flex flex-col w-full gap-3'>
                    <FormLabel className='text-base-semibold text-light-2 px-4'>
                        Name
                    </FormLabel>
                    <FormControl  className='flex-1 text-base-semibold text-gray-200'>
                        <Input type='text'
                            className='border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent !focus-visible:ring-offset-0 '
                            {...field}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
                
                
                <FormField
                control={form.control}
                name="username"
                render={ ( { field } ) => (
                    <FormItem className=' flex flex-col w-full gap-3'>
                    <FormLabel className='text-base-semibold text-light-2 px-4'>
                        Username
                    </FormLabel>
                    <FormControl  className='flex-1 text-base-semibold text-gray-200'>
                        <Input type='text'
                            className='border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent !focus-visible:ring-offset-0 '
                            {...field}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
                
                
                <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem className='flex flex-col w-full gap-3'>
                    <FormLabel className='text-base-semibold text-light-2 px-4'>
                        Bio
                    </FormLabel>
                    <FormControl  className='flex-1 text-base-semibold text-gray-200'>
                        <Textarea className=' resize-none border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent !focus-visible:ring-offset-0' rows={10}
                        {...field}
                        >
                        
                        </Textarea>
                    </FormControl>
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

export default AccountProfile
