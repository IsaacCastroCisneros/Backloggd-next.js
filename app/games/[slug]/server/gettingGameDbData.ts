"use server"

import get from "@/server/get"

const gettingGameDbData =async(data:Array<number>):Promise<string>=>
{
  return JSON.stringify(JSON.parse(await get(
    {
      query:`SELECT 
      COUNT(CASE WHEN status = 'playing' THEN 1 END) AS playing,
      COUNT(CASE WHEN status != 'NULL' THEN 1 END) AS plays,
      COUNT(CASE WHEN list_id != 'NULL' THEN 1 END) AS listed
      FROM game
      WHERE game_id = ?`,data}))) 
}

export default gettingGameDbData