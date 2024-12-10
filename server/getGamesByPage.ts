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
        const[results]=await pool.query<Array<RowDataPacket>>("select * from game where user_id=? order by id desc limit ? offset ?",[user_id,limit,offset])
        const[quantity]=await pool.query<Array<RowDataPacket>>("select count(*) from game where user_id=?",[user_id])
        return JSON.stringify({res:{games:results as Array<game>, quantity:quantity[0]["count(*)"]}  ,err:null})  
    }
    catch(err)
    {
       return JSON.stringify({res:[],err}) 
    }
}
