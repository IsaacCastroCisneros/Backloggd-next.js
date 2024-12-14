"use server"

import pool from "@/config/db"
import user from "@/interfaces/user"
import authorizeUser from "@/util/authorizeUser"
import { RowDataPacket } from "mysql2"

interface props
{
  newUserData:user
  userName:string
}

export default async function updateUser({newUserData,userName}:props):Promise<string>
{
  /* const{res,err}=await authorizeUser({userName})
  if(err)return JSON.stringify({res:[],err})
  const{authorized}=res[0]
  
  if(!authorized)return JSON.stringify({res:[],err:"unauthorized"}) */

  try
  {
    const[results]=await pool.query<Array<RowDataPacket>>("update users set ? where id=?",[newUserData,newUserData.id])
    return JSON.stringify({res:results,err:null}) 
  }catch(err)
  {
    console.log(err)
    return JSON.stringify({res:[],err}) 
  }
}
