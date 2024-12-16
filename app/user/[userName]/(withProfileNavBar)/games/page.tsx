import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import NotFound from '@/app/not-found'
import ClientContent from './components/ClientContent/ClientContent'


export default async function page({params,searchParams}:any) 
{
  const {userName} = params
  const{page:ogPage,type="all"}= searchParams
  
  const page =Number(ogPage||1)

  const {res,err} =JSON.parse(await getUser({userName}))
  if(res.length===0||err)return NotFound()
  const user = res[0] as user

  return <ClientContent userName={userName} page={page} type={type} userId={user.id} />
}


