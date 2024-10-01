"use server"

import { RowDataPacket } from "mysql2";
import listData from "../../../interfaces/listData";
import pool from "@/config/db";

interface props 
{
  oldList:listData
  newList:listInf
}

export default async function updatingList(props:props)
{
   const{oldList,newList}=props

   try
   {  
     const lol = await pool.query<Array<RowDataPacket>>("update gameList set ? where id=?",[newList,oldList.id])
   }
   catch(err)
   {
     console.log(err)
   }
}