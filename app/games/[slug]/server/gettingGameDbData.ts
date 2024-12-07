"use server"

import get from "@/server/get"

const gettingGameDbData =async(data:Array<number>):Promise<string>=>
{
  const byGameTB= JSON.parse(await get(
    {
      query:`SELECT 
      COUNT(CASE WHEN status = 'playing' THEN 1 END) AS playing,
      COUNT(CASE WHEN status != 'NULL' THEN 1 END) AS plays
      FROM game
      WHERE game_id = ?`,data}))
  
  const byGameListItem = 
    JSON.parse(
      await get({
        query: `SELECT COUNT(DISTINCT list_id)
                FROM gameListItem
                WHERE game_id = ?;`,
        data,
      })
    ) 

  return JSON.stringify({...byGameTB,listed:0}) 
}

export default gettingGameDbData