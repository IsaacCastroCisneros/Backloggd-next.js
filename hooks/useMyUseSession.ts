import user from '@/interfaces/user'
import { useSession } from 'next-auth/react'

export default function useMyUseSession() 
{
    const data = useSession().data
    const user = data ? data.user as user : null 

    return user
}
