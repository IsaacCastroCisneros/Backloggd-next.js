"use server"

import get from '@/server/get'

export default async function getList(data:string) 
{
   return await get({query:"select * from gameList where user_id=?",data})
}
