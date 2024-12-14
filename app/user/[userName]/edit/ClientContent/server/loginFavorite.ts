"use server"

import pool from "@/config/db"
import favoritePosition from "@/types/favoritePosition"
import authorizeUser from "@/util/authorizeUser"
import { RowDataPacket } from "mysql2"

interface props 
{
  favorite:{game_id:string
  user_id:string
  favorite_position:favoritePosition
  favorite:boolean
  slug:string}
  userName:string
    
}

export default async function loginFavorite({favorite,userName}:props) 
{
    const{favorite_position,user_id,game_id}=favorite

/*     const{res}=await authorizeUser({userName})
    const{authorized}=res[0]
    
    if(!authorized)return JSON.stringify({res:[],err:"unauthorized"}) */

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
