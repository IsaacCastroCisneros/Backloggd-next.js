import React from 'react'

export default function  getAllGames({temmpGames,ogGameList}:{temmpGames:Array<any>,ogGameList:Array<any>}) 
{
   console.log(temmpGames)
   console.log(ogGameList)

    if(ogGameList.length!==temmpGames.length)
    {
        const resultMap = new Map(temmpGames.map((row:any) => [row.id, row]))
        return ogGameList.map((item:any) => resultMap.get(item.game_id))
    }

    return temmpGames
}
