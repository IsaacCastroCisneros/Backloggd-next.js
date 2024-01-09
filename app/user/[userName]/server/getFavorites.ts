"use server"

import get from '@/server/get'


export default async function getFavorites(userId:string) 
{
  return await get({query:"select game_id,favorite_position from game where user_id=? and favorite=1",data:userId})
}
