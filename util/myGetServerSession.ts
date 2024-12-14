"use server"

import user from '@/interfaces/user'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function myGetServerSession() 
{
    const session:null|{user:user} = await getServerSession(authOptions)
    if(session===null)return session
    const user = session?.user as user

    return user
}
