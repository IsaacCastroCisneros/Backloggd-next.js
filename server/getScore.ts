"use server"

import pool from "@/config/db";
import { RowDataPacket } from "mysql2";

export default async function getScore(gameId:string,userId:string):Promise<string>
{
    try
    {
        const[results]= await pool.query<Array<RowDataPacket>>("select score from game where game_id=? and user_id=?",[gameId,userId])
        return JSON.stringify({res:results,err:null}) 
    }
    catch(err)
    {
        return JSON.stringify({res:[],err}) 
    }

}