"use server"

import pool from "@/config/db"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { RowDataPacket } from "mysql2"
import { getServerSession } from "next-auth/next"
import getGame from "../getGame"
import gameLoginProps from "./interfaces/gameLoginProps"



export default async function gameLogin(game:gameLoginProps):Promise<string> 
{
    const user = await getServerSession(authOptions)
    if(user===null)return JSON.stringify({res:[],err:"unauthorized"}) 
    
    const{type,...finalGame}=game

    try
    {
        const{res:results}=JSON.parse(await  getGame(game.game_id,game.user_id)) 
        
        if(results.length===0)
        {
            if(type!=="status"&&type!=="fullGame")
            {
                await pool.query<Array<RowDataPacket>>("insert into game set ?",{...finalGame,status:"completed"} )                
            }
            else
            {
                await pool.query<Array<RowDataPacket>>("insert into game set ?",{...finalGame})
            }
            return JSON.stringify({res:["created"],err:null}) 
        }
       
        await pool.query<Array<RowDataPacket>>(`update game set ? where id=?`,[finalGame,results[0].id])
        return JSON.stringify({res:["updated"],err:null}) 
    }
    catch(err)
    {
       console.log(err)
       return JSON.stringify({res:[],err}) 
    }

}