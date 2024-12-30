"use server"

import listItem from '@/app/user/[userName]/lists/interfaces/listItem'
import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'

interface props
{userId:string,list:Array<listItem>|Array<{id:string}>,listIdFromDb:string}

export default async function insertGameAndList({userId,list,listIdFromDb}:props) 
{
    const myArr = list.map(game=>[game.id,userId])

    try
    {
        await pool.query<Array<RowDataPacket>>("INSERT IGNORE INTO game (game_id, user_id) values ?",[myArr])
        const [gamesJustAdded]=await pool.query<Array<RowDataPacket>>("select id, game_id from game where (game_id, user_id) in (?)",[myArr])
        
        if(gamesJustAdded.length!==myArr.length)
        {
          const arr1 = myArr.map((item) => item[0]);
          const arr2 = [...gamesJustAdded];

          const countArray2 = arr2.reduce((acc:any, item) => {
            acc[item.game_id] = {count:(acc[item.id] || 0) + 1,dbId:item.id} ;
       
            return acc;
          }, {});
      
          const difference = arr1.map((item) => {
            if (countArray2[item].count) {
                countArray2[item].count--;
                return false; 
              }
              return {id:countArray2[item].dbId}; 
          }).filter(item=>item);
      
      
          await  pool.query<Array<RowDataPacket>>("insert into game_list_item (game_id, list_id) values ?",[[...gamesJustAdded,...difference].map((game:any)=>[game.id,listIdFromDb])])
          return
        }
        await  pool.query<Array<RowDataPacket>>("insert into game_list_item (game_id, list_id) values ?",[gamesJustAdded.map(game=>[game.id,listIdFromDb])])

        return {err:null}
    }
    catch(err)
    {
        console.log(err)
        return {err}
    }
}
