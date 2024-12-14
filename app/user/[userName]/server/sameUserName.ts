"use server"

import get from '@/server/get'

interface props
{ 
  userName:string
}

export default async function sameUserName({userName}:props):Promise<boolean>
{
  const{res,err}=JSON.parse(await get({query:"select username from users where username=?",data:[userName]}))

  const bool= res.length===0 ? false:true
  return bool
}
