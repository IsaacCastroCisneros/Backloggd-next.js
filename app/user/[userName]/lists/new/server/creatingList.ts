"use server"

import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'
import listItem from '../../interfaces/listItem'

interface props
{
    user_id:string
    name:string
    description:string
    lists:Array<listItem>
    slug:string
}


export default async function creatingList({lists,user_id,slug,...props}:props):Promise<string> 
{
   try
   {  
     let mySlug = slug 
     const [nameCount] =await pool.query<Array<RowDataPacket>>("select count(*) from gameList where name=?",[props.name])
     const count = nameCount[0]["count(*)"]

     if(count>0)
    {
      const slugArr= mySlug.split("-")
      
      mySlug = [...slugArr, count].join("-");
    }

    const [results] =await pool.query<Array<RowDataPacket>>("insert into gameList set ?",{...props,user_id,slug:mySlug})
  
    if(lists.length===0)return JSON.stringify({res:[props,mySlug],err:null})

    const listResults=results as any 
    const myArr = lists.map(item=>[item.id,user_id])

    await pool.query<Array<RowDataPacket>>("INSERT IGNORE INTO game (game_id, user_id) values ?",[myArr])
    const [gamesJustAdded]=await pool.query<Array<RowDataPacket>>("select id from game where (game_id, user_id) in (?)",[myArr])
    await  pool.query<Array<RowDataPacket>>("insert into gameListItem (game_id, list_id) values ?",[gamesJustAdded.map(game=>[game.id,listResults.insertId])])

    return JSON.stringify({res:[props,mySlug],err:null})
   
   }
   catch(err)
   {
     console.log(err)
     return JSON.stringify({res:[],err}) 
   }
}
