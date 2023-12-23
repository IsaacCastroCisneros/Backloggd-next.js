import user from '@/interfaces/user'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Session, getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import ClientContent from './ClientContent/ClientContent'
import getGame from '@/server/getGame'
import getFavorites from '../server/getFavorites'
import ErrMsg from '@/components/ErrMsg/ErrMsg'

interface values
{
  username:string
  twitter:string
  bio:string
}

export default async function page() 
{

  try
  {
    const session = await getServerSession(authOptions)
    if(session===null)return notFound()
  
    const{user}=session as Session
    const{id}=user as user
    const {res:favorites} = JSON.parse(await getFavorites(id))  

    return (
      <ClientContent {...user as user} favorites={favorites} />
    );
  }
  catch(err)
  {
     return <ErrMsg/>
  }
 

}
