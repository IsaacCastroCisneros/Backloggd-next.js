"use server"

import pool from "@/config/db"
import fullUser from "../../intefaces/fullUser"
import { RowDataPacket } from "mysql2"
import {signUpServer as schema}  from "@/util/validations"

interface props
{
  query:string
  user:fullUser
}

export default async function signUp({query,user}:props):Promise<{err:Array<string>|null,res:null|fullUser}>
{
  const { error } = schema.validate(user, { abortEarly: false }) 

  if(error) return {err:["an error was occured"],res:null}

  const[results] = await pool.query<Array<RowDataPacket>>(
    `SELECT
  distinct
  CASE WHEN username = ? THEN username END AS username,
  CASE WHEN email = ? THEN email END AS email
  FROM users`,
  [
    user.userName,
    user.email,
  ]
  );

  if(results.length>1)
  {
    const errors=results[1]
    const errorsMsg=
    [
      errors.username ? "el usuario se encuentra registrado":null,
      errors.email?"el email se encuentra registrado":null
    ]
    return {err:errorsMsg.filter(err=>err!==null) as Array<string>,res:null} 
  }
  
  await pool.query<Array<RowDataPacket>>(query,user)
  return{err:null,res:user}

}
