import user from '@/interfaces/user'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Session, getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import ClientContent from './ClientContent/ClientContent'

interface values
{
  username:string
  twitter:string
  bio:string
}

export default async function page() 
{

  const session = await getServerSession(authOptions)
  if(session===null)return notFound()

  const{user}=session as Session

  return (
    <ClientContent {...user as user} />
  );
}
