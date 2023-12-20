"use server"

import pool from "@/config/db"
import serverResponse from "@/interfaces/serverResponse"
import user from "@/interfaces/user"
import { RowDataPacket } from "mysql2"

export default async function updateUser(user:user):Promise<serverResponse>
{
  try
  {

    const[results]=await pool.query<Array<RowDataPacket>>("update users set ? where id=?",[user,user.id])
    return {res:results,err:null}
  }catch(err)
  {
    return {res:[],err}
  }
}
