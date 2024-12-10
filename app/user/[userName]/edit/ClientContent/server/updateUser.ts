"use server"

import pool from "@/config/db"
import user from "@/interfaces/user"
import { RowDataPacket } from "mysql2"

export default async function updateUser(user:user):Promise<string>
{
  try
  {
    const[results]=await pool.query<Array<RowDataPacket>>("update users set ? where id=?",[user,user.id])
    return JSON.stringify({res:results,err:null}) 
  }catch(err)
  {
    console.log(err)
    return JSON.stringify({res:[],err}) 
  }
}
