"use server"

import pool from '@/config/db'
import { game } from '@/interfaces/game'
import { RowDataPacket } from 'mysql2'
import React from 'react'

interface props
{
    user_id:string
    limit:number
    offset:number
}

export default async function getGamesByPage({user_id,limit,offset}:props) 
{
    try
    {
        const[results]=await pool.query<Array<RowDataPacket>>("select * from game where user_id=? limit ? offset ? ",[user_id,limit,offset])
        return JSON.stringify({res:results as Array<game>,err:null})  
    }
    catch(err)
    {
       return JSON.stringify({res:[],err}) 
    }
}
