"use server"

import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'
import listItem from '../components/ClientCotent/interfaces/listItem'

interface props
{
    user_id:string
    name:string
    description:string
    list:Array<listItem>
}


export default async function updatingList({list,user_id,...props} :props):Promise<string> 
{
   try
   {
    const [results] =await pool.query<Array<RowDataPacket>>("insert into gameList set ?",{...props,user_id})
    const listResults=results as any 
    const myArr = list.map(item=>[item.id,user_id])

    await pool.query<Array<RowDataPacket>>("INSERT IGNORE INTO game (game_id, user_id) values ?",[myArr])
    const [gamesJustAdded]=await pool.query<Array<RowDataPacket>>("select id from game where (game_id, user_id) in (?)",[myArr])
    await  pool.query<Array<RowDataPacket>>("insert into gameListItem (game_id, list_id) values ?",[gamesJustAdded.map(game=>[game.id,listResults.insertId])])
/* 
    const lisIds= list.map(item=>[item.id,rowId,user_id])
    await pool.query<Array<RowDataPacket>>("insert into game (game_id, list_id, user_id) values ? on duplicate key update list_id=values(list_id)",[lisIds]) */

    return JSON.stringify({res:[props],err:null})
   }
   catch(err)
   {
     console.log(err)
     return JSON.stringify({res:[],err}) 
   }
}
