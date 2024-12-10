"use server"

import user from '@/interfaces/user'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function myGetServerSession() 
{
    const session= await getServerSession(authOptions)
    const user = session?.user as user

    return user
}
