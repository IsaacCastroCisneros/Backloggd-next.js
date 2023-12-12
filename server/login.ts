"use server"

import pool from "@/config/db"
import logUser from "@/interfaces/logUser"
import dbUser from "@/interfaces/user"
import { RowDataPacket } from "mysql2"

interface props
{
  user:logUser,
  query:string
}

export default async function login({user,query}:props):Promise<{err:Array<string>|null,res:null|dbUser}>
{

  const[myUser] = await pool.query<Array<RowDataPacket>>(query,user.email);
  if(myUser.length===0) return {err:["email is not registered"],res:null}
  if(myUser[0].password !== user.password)return {err:["the password is incorrect"],res:null}
  return {err:null,res:myUser[0] as dbUser}

}