"use server"

import pool from "@/config/db"
import { game } from "@/interfaces/game"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { RowDataPacket } from "mysql2"
import { getServerSession } from "next-auth/next"
import getGame from "./getGame"
import favoritePosition from "@/types/favoritePosition"

interface gameMinimal
{
    game_id:string
    user_id:string
} 

interface gameScore extends gameMinimal
{
    score:number
}
interface gameFavorite extends gameMinimal
{
    favorite:boolean
    favorite_position:{new:favoritePosition,old:favoritePosition}
}

interface gameNoId extends Omit<game, 'id'>
{

}

type props = gameNoId|gameMinimal|gameFavorite|gameScore

export default async function gameLogin(game:props):Promise<string> 
{
    const user = await getServerSession(authOptions)
    if(user===null)return JSON.stringify({res:[],err:"unauthorized"}) 

    console.log(game)

    try
    {
        const{res:results}=await getGame(game.game_id,game.user_id)
        
        if(results.length===0)
        {
            await pool.query<Array<RowDataPacket>>("insert into game set ?",game)
            return JSON.stringify({res:["created"],err:null}) 
        }
       
        await pool.query<Array<RowDataPacket>>(`update game set ? where id=?`,[game,results[0].id])
        return JSON.stringify({res:["updated"],err:null}) 
    }
    catch(err)
    {
       console.log(err)
       return JSON.stringify({res:[],err}) 
    }

}