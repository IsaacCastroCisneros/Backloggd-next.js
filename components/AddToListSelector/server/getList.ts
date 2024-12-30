"use server"

import get from '@/server/get'

export default async function getList(data:string) 
{
   return await get({query:"select * from game_list where user_id=?",data})

   
}
