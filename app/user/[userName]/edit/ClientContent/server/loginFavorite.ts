"use server"

import pool from "@/config/db"
import favoritePosition from "@/types/favoritePosition"
import { RowDataPacket } from "mysql2"

interface props 
{
    game_id:string
    user_id:string
    favorite_position:favoritePosition
    favorite:boolean
}

export default async function loginFavorite(favorite:props) 
{
    const{favorite_position,user_id}=favorite
 
    try
    {  
        const[results]=await pool.query<Array<RowDataPacket>>("select id from game where favorite_position=? and user_id=?",[favorite_position,user_id]) 

        if(results.length>0)
        {
          return await pool.query("update game set ? where id=?", [
            favorite,
            results[0].id,
          ]);
        }
        await pool.query("insert into game set ?",favorite)
        return JSON.stringify({res:["updated"],err:null}) 
    }
    catch(err)
    {
        console.log(err)
        return JSON.stringify({res:[],err}) 
    }
}
