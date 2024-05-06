"use server"

import pool from "@/config/db"
import { RowDataPacket } from "mysql2"

interface props
{
    userId:string
    gameId:string
}

export default async function deletingLog(game:props):Promise<string>  
{
    const{userId,gameId}=game
    
    try
    {
        await pool.query<Array<RowDataPacket>>("delete from game where user_id=? and game_id=?",[userId,gameId])
        return JSON.stringify({res:[game],err:null})
    }
    catch(err)
    {
        return JSON.stringify({res:[],err})
    }
}
