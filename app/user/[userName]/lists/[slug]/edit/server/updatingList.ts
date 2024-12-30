"use server"

import { RowDataPacket } from "mysql2";
import listData from "../../../interfaces/listData";
import pool from "@/config/db";
import listInf from "../../../interfaces/listInf";
import listItem from "../../../interfaces/listItem";
import insertGameAndList from "@/server/insertGameAndList";
import authorizeUser from "@/util/authorizeUser";
import validateSameSlug from "@/util/validateSameSlug";

interface props 
{
  oldList:oldList
  newList:newList
  userName:string
  oldSlug:string
}


interface newList extends listInf
{
  list:Array<listItem>
}

interface oldList extends listData
{
  list:Array<listItem>
}


export default async function updatingList(props:props):Promise<string>
{
   const{oldList,newList,userName,oldSlug}=props
   const{list:oldL,id,user_id}=oldList
   const{list:newL,...finalList}=newList

   const{res}=await authorizeUser({userName})
   const{authorized}=res[0]

   if(!authorized)return JSON.stringify({res:[],err:"unauthorized"})

   try
   {  
        if(JSON.stringify(oldL)!==JSON.stringify(newL))
        {
          if(oldL.length>0)
          {
            const [results] = await pool.query<Array<RowDataPacket>>("select game_id from game_list_item where list_id=?",[id])
            const ids = results.map(id=>id.game_id)
  
            await pool.query<Array<RowDataPacket>>("delete from game_list_item where list_id=?",[id])
          
            await pool.query<Array<RowDataPacket>>(
              "delete from game where id in (?) and score=? and status=? and review=? and platform=? and favorite=? and favorite_position is null",
              [ids,0,"none","","",0]
            );
          }

          await insertGameAndList({userId:`${user_id}`,list:newL,listIdFromDb:`${id}`})
        }
        const{slug,name}=finalList
        
        let finalSlug=slug
        if(slug!==oldSlug)
        {
          finalSlug= await validateSameSlug({slug,listName:name})
        }
        
        await pool.query<Array<RowDataPacket>>("update game_list set ? where id=?",[{...finalList,slug:finalSlug},id])

        return JSON.stringify({res:["success"],err:null})
   }
   catch(err)
   {
     console.log(err)
     return JSON.stringify({res:[],err})
   }
}