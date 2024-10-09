"use server"

import { RowDataPacket } from "mysql2";
import listData from "../../../interfaces/listData";
import pool from "@/config/db";
import listInf from "../../../interfaces/listInf";
import listItem from "../../../interfaces/listItem";
import insertGameAndList from "@/server/insertGameAndList";

interface props 
{
  oldList:oldList
  newList:newList
}


interface newList extends listInf
{
  list:Array<listItem>
}

interface oldList extends listData
{
  list:Array<listItem>
}


export default async function updatingList(props:props)
{
   const{oldList,newList}=props
   const{list:oldL,id,user_id}=oldList
   const{list:newL,...finalList}=newList

   try
   {  
        if(JSON.stringify(oldL)!==JSON.stringify(newL))
        {
          await pool.query<Array<RowDataPacket>>("delete from gameListItem where list_id=?",[id])
          await insertGameAndList({userId:`${user_id}`,list:newL,listIdFromDb:`${id}`})
          await pool.query<Array<RowDataPacket>>(
            "delete from game where list_id=? and score=? and status=? and review=? and platform=? and favorite=? and favorite_position=?",
            [id,0,"none","","",false,null]
          );
        }
        await pool.query<Array<RowDataPacket>>("update gameList set ? where id=?",[finalList,id])
   }
   catch(err)
   {
     console.log(err)
   }
}