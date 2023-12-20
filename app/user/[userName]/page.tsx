import React from 'react'
import getUser from './server/getUser'
import { notFound } from 'next/navigation'
import ErrMsg from '@/components/ErrMsg/ErrMsg'
import ClientContent from './components/ClientContent/ClientContent'
import user from '@/interfaces/user'

export default async function page({params}:any) 
{
  const{userName}=params

  try
  {

    const{res,err}=await getUser({userName})
  
    if(err)return <ErrMsg/>
    if(res.length===0)return notFound()

    const{password,...user}=res[0] as user

    return <ClientContent {...user}/>

  }catch
  {
    return <ErrMsg/>
  }

}
