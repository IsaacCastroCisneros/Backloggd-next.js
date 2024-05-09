"use server"

import pool from "@/config/db"

interface props
{
    userId:string
}

export default async function removingEmptyLogs({userId}:props):Promise<string> 
{
    try
    {
        await pool.query(`delete from game where user_id=? and favorite=0 and status='none' and review='' and score=0 and list_id is NULL`,[userId])  
 
        return JSON.stringify({res:[userId],err:null}) 
    }
    catch(err)
    {
        return JSON.stringify({res:[],err})
    }
}
