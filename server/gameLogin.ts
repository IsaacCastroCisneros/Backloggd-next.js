"use server"

import pool from "@/config/db"
import { game } from "@/interfaces/game"
import serverResponse from "@/interfaces/serverResponse"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { RowDataPacket } from "mysql2"
import { getServerSession } from "next-auth/next"
import getGame from "./getGame"

interface gameMinimal
{
    game_id:string
    user_id:string
    score:number
} 

interface gameNoId extends Omit<game, 'id'>
{

}

export default async function gameLogin(game:gameNoId|gameMinimal):Promise<serverResponse> 
{
    const user = await getServerSession(authOptions)
    if(user===null)return {res:[],err:"unauthorized"}

    try
    {
        const{res:results}=await getGame(game.game_id,game.user_id)
        
        if(results.length===0)
        {
            await pool.query<Array<RowDataPacket>>("insert into game set ?",game)
            return {res:["created"],err:null}
        }
        await pool.query<Array<RowDataPacket>>("update game set ? where id=?",[game,results[0].id])
        return {res:["updated"],err:null}
    }
    catch(err)
    {
       console.log(err)
       return {res:[],err}
    }

}