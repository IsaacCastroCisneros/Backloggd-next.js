"use server"

import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'
import props from '../../interfaces/props'

export default async function deleteList({listId,userId}:props):Promise<string>
{
  try
  {
    const[games]=await pool.query<Array<RowDataPacket>>("select game_id from gameListItem where list_id=?",[listId])
    await pool.query<Array<RowDataPacket>>("delete from gameListItem where list_id=?",[listId])
    
    const gamesAboutToDelete = games.map(async(game)=>
    {
        await pool.query<Array<RowDataPacket>>(`delete from game where user_id=? and id=? and score=0 and status="none" and review="" and platform="none" and favorite=false and favorite_position is null`,[userId,game.game_id])
    })

    await Promise.all(gamesAboutToDelete)

    await pool.query<Array<RowDataPacket>>("delete from gameList where id=?",[listId])

    return JSON.stringify({res:["success"],err:null})
  }
  catch(err)
  {
     console.log(err)
     return JSON.stringify({res:[],err})
  }
  
}
