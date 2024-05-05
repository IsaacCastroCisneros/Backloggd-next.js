"use server"

import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'

interface props
{
    user_id:string
    name:string
    description:string
}

export default async function updatingList(props:props):Promise<string> 
{
   try
   {
     
     await pool.query<Array<RowDataPacket>>("insert into gameList set ?",props)
     return JSON.stringify({res:[props],err:null})
   }
   catch(err)
   {
     return JSON.stringify({res:[],err}) 
   }
}
