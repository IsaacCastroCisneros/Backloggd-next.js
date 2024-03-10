"use server"

import pool from "@/config/db"
import { game } from "@/interfaces/game"
import { RowDataPacket } from "mysql2"

export default async function getGame(gameId:string,userId:string):Promise<string>
{
    try
    {
        const[results]=await pool.query<Array<RowDataPacket>>("select * from game where game_id=? and user_id=?",[gameId,userId])
        return JSON.stringify({res:results as Array<game>,err:null}) 
    }
    catch(err)
    {
        return JSON.stringify({res:[],err}) 
    }
}