"use server"

import listItem from '@/app/user/[userName]/lists/interfaces/listItem'
import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'

interface props
{userId:string,list:Array<listItem>,listIdFromDb:string}

export default async function insertGameAndList({userId,list,listIdFromDb}:props) 
{
    const myArr = list.map(game=>[game.id,userId])

    try
    {
        await pool.query<Array<RowDataPacket>>("INSERT IGNORE INTO game (game_id, user_id) values ?",[myArr])
        const [gamesJustAdded]=await pool.query<Array<RowDataPacket>>("select id from game where (game_id, user_id) in (?)",[myArr])
        await  pool.query<Array<RowDataPacket>>("insert into gameListItem (game_id, list_id) values ?",[gamesJustAdded.map(game=>[game.id,listIdFromDb])])

        return {err:null}
    }
    catch(err)
    {
        console.log(err)
        return {err}
    }
}
