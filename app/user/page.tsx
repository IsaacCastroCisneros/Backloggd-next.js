import user from '@/interfaces/user'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


export default async function page() 
{
  const session= await getServerSession(authOptions)
  const user = session?.user as user
 
  return redirect(`/user/${user.username}`)
}
