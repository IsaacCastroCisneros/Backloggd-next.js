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
    const{favorite_position,user_id,game_id}=favorite

    if(!favorite.favorite)
    {
      await pool.query("update game set ? where favorite_position=? and user_id=?", [
        {
          favorite:false,
          favorite_position:null
        },
        favorite_position,
        user_id
      ]);
      return
    }
    console.log(favorite)

    try
    {  
      const[exist]=await pool.query<Array<RowDataPacket>>("select id from game where game_id=? and user_id=?",[game_id,user_id]) 

      if(exist.length>0)
      {
        await pool.query("update game set ? where id=?", [
          {
            favorite:true,
            favorite_position
          },
          exist[0].id,
        ]);
        return
      }

      const[thereIsFavorite]=await pool.query<Array<RowDataPacket>>("select id from game where favorite_position=? and user_id=?",[favorite_position,user_id]) 
      if(thereIsFavorite.length>0)
      {
        await pool.query("update game set ? where id=?", [
          {
            favorite:false,
            favorite_position:null
          },
          thereIsFavorite[0].id,
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
