"use server"

import get from '@/server/get';
import igdb from '@/util/igdb';
import listItem from '../../../interfaces/listItem';
import { v4 as uuidv4 } from 'uuid'


export default async function gettingIdsFromIgdb(gameList:Array<any>):Promise<{lists:Array<any>,games:Array<any>}>
{
  const { res: games } = JSON.parse(
      await get({
        query: "select game_id, id from game where id in (?)",
        data: [gameList.map((game: { game_id: string }) => game.game_id)],
      })
    ); 

    const {res:gameData} = await igdb({type:"games",query:`where id=(${games.map((game:any) =>(game.game_id))}); fields cover,name;`}) 
    const {res:covers} = await igdb({type:"covers",query:`where id=(${gameData.map(game=>(game.cover)).filter(cover=>cover)}); fields game, url;`}) 

    const lists =gameData.map(game=>
      {
        const listData:listItem=
          {
            id:game.id,
            name:game.name,
            cover:"",
            listId:uuidv4()
          }
      
           covers.forEach((c:any)=>
           {
              if(c.game===listData.id)
              {
                listData.cover = c.url;
              }
           })
          return listData
      })
 
  return {lists,games}
}
