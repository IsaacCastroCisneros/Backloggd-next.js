"use server"

import pool from "@/config/db"
import { RowDataPacket } from "mysql2"

interface props
{
  query:string
  data?:any
}

export default async function get({query,data=""}:props):Promise<string>
{
    try
    {
        const[results]=await pool.query<Array<RowDataPacket>>(query,data)
        return JSON.stringify({res:results,err:null})
    }
    catch(err)
    {
        console.log(err)
        return JSON.stringify({res:[],err})     
    }
}