"use server"

import pool from '@/config/db'
import { game } from '@/interfaces/game'
import gameStatus from '@/types/gameStatus'
import { RowDataPacket } from 'mysql2'


type status = gameStatus | "all"

interface props
{
    user_id:string
    limit:number
    offset:number
    type:status
}

export default async function getGamesByPage({user_id,limit,offset,type}:props) 
{
    try
    {
        let finalResults: Array<any> = [];
        let finalQuantity: Array<any> = [];

        if (type === "all") 
        {
          const [results] = await pool.query<Array<RowDataPacket>>(
            "select * from game where user_id=? order by id desc limit ? offset ?",
            [user_id, limit, offset]
          );
          const [quantity] = await pool.query<Array<RowDataPacket>>(
            "select count(*) from game where user_id=?",
            [user_id]
          );
          finalResults=results
          finalQuantity=quantity
        }
        else 
        {
            const [results] = await pool.query<Array<RowDataPacket>>(
                "select * from game where user_id=? and status=? order by id desc limit ? offset ?",
                [user_id,type, limit, offset]
              );
              const [quantity] = await pool.query<Array<RowDataPacket>>(
                "select count(*) from game where user_id=? and status=?",
                [user_id,type]
              );
              finalResults=results
              finalQuantity=quantity
        }
        
        
        return JSON.stringify({
          res: {
            games: finalResults as Array<game>,
            quantity: finalQuantity[0]["count(*)"],
          },
          err: null,
        });
        
    }
    catch(err)
    {
       return JSON.stringify({res:[],err}) 
    }
}
