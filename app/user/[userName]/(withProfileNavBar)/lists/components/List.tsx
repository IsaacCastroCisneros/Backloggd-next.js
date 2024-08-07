"use server"

import React from 'react'
import list from '../interfaces/list'
import get from '@/server/get'
import igdb from '@/util/igdb'

export default async function List({id}:list) 
{
  const {res}= JSON.parse(await get({query:"select * from gameListItem where list_id=?",data:id}))
  let games:{res:Array<any>,err:null|unknown} = {res:[],err:null}
  let igdbGames:{res:Array<any>}={res:[]}

  if(res.length>0)
  {
    games = JSON.parse(
      await get({
        query: "select game_id from game where id in (?)",
        data: [res.map((item) => item.game_id)],
      })
    );

    const {res:gamesIds,err}=games
    const {res:gamesIgdbCovers}= await igdb({type:"games",query:`where id=(${gamesIds.map(id=>id.game_id).join(",")}); fields cover; limit 25;`})
    igdbGames= await igdb({type:"covers",query:`where id=(${gamesIgdbCovers.map(game=>game.cover).join(",")}); fields url; limit 25;`})
  }

  const{res:IgdbCovers}=igdbGames
  console.log(IgdbCovers)
  


/*   const lol = await igdb({type:"games",query:`where id=(${ids.join(",")}); fields *;`}) */


  return (
    <div className='bg-[#fff]'>
      lelos
    </div>
  )
}
