"use server"

import pool from "@/config/db";
import serverResponse from "@/interfaces/serverResponse";
import { RowDataPacket } from "mysql2";

interface props
{
    userName:string
}

export default async function getUser({userName}:props):Promise<serverResponse> 
{
   try
   {

       const[results]= await pool.query<Array<RowDataPacket>>("select * from users where username=?",userName)

       if(results.length===0)return {res:results,err:true}
       return {res:results,err:null}
   }
   catch(err)
   {
       return {res:[],err}
   }

}
