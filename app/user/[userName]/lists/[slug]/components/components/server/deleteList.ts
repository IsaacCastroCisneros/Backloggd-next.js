"use server"

import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'
import props from '../../interfaces/props'
import authorizeUser from '@/util/authorizeUser'
import user from '@/interfaces/user'

export default async function deleteList({listId,user}:props):Promise<string>
{
  const{id:userId,username}=user as user
  const{res}=await authorizeUser({userName:username})
  const{authorized}=res[0]

  if(!authorized)return JSON.stringify({res:[],err:"unauthorized"})

  try
  {
    const[games]=await pool.query<Array<RowDataPacket>>("select game_id from game_list_item where list_id=?",[listId])
    await pool.query<Array<RowDataPacket>>("delete from game_list_item where list_id=?",[listId])
    
    const gamesAboutToDelete = games.map(async(game)=>
    {
        await pool.query<Array<RowDataPacket>>(`delete from game where user_id=? and id=? and score=0 and status="none" and review="" and platform="none" and favorite=false and favorite_position is null`,[userId,game.game_id])
    })

    await Promise.all(gamesAboutToDelete)

    await pool.query<Array<RowDataPacket>>("delete from game_list where id=?",[listId])

    return JSON.stringify({res:["success"],err:null})
  }
  catch(err)
  {
     console.log(err)
     return JSON.stringify({res:[],err})
  }
  
}
