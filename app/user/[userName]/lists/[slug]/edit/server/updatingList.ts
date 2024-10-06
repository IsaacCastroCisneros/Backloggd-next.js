"use server"

import { RowDataPacket } from "mysql2";
import listData from "../../../interfaces/listData";
import pool from "@/config/db";
import listInf from "../../../interfaces/listInf";
import listItem from "../../../interfaces/listItem";

interface props 
{
  oldList:oldList
  newList:newList
}


interface newList extends listInf
{
  list:Array<string>
}

interface oldList extends listData
{
  list:Array<string>
}


export default async function updatingList(props:props)
{
   const{oldList,newList}=props
   const{list:oldL}=oldList
   const{list:newL}=newList
   console.log(oldL)

   try
   {  
        if(JSON.stringify(oldL)!==JSON.stringify(newL))
        {
          const goToDelete = oldL.filter(item=> !newL.includes(item))
          const goToAdd = newL.filter(item=> !oldL.includes(item))

         console.log(goToAdd)
         console.log(goToDelete)
          
        }
    /*  await pool.query<Array<RowDataPacket>>("update gameList set ? where id=?",[newList,oldList.id]) */
   }
   catch(err)
   {
     console.log(err)
   }
}