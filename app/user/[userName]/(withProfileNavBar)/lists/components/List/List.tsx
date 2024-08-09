"use server"

import React from 'react'
import list from '../../interfaces/list'
import get from '@/server/get'
import igdb from '@/util/igdb'
import Cover from './components/Cover'

export default async function List({id}:list) 
{
  const {res}= JSON.parse(await get({query:"select * from gameListItem where list_id=? limit 5",data:id}))
  let games:{res:Array<any>,err:null|unknown} = {res:[],err:null}
  let igdbGames:{res:Array<any>}={res:[{url:""},{url:""},{url:""},{url:""},{url:""}]}

/*   const loles =await igdb({type:"games",query:`where slug="super-mario-advance-4-super-mario-bros-3-e-para-beetle-challenge"; fields *; limit 25;`}) */

  if(res.length>0)
  {
    games = JSON.parse(
      await get({
        query: "select game_id from game where id in (?)",
        data: [res.map((item) => item.game_id)],
      })
    );

   
    const {res:gamesIds,err}=games
    const { res: gamesIgdbCovers } = await igdb({
      type: "games",
      query: `where id=(${gamesIds
        .map((id) => id.game_id)
        .join(",")}); fields cover; limit 25;`,
    });

    if(!gamesIgdbCovers.some(cover=>cover.cover))return

    igdbGames = await igdb({
      type: "covers",
      query: `where id=(${gamesIgdbCovers
        .filter((cover) => cover.cover)
        .map((game) => game.cover)
        .join(",")}); fields url; limit 25;`,
    });
  }

  const{res:IgdbCovers}=igdbGames
  
  return (
    <div>
      <Cover coverArr={IgdbCovers} number={0} className="relative">
        <Cover
          coverArr={IgdbCovers}
          number={1}
          className="absolute top-0 translate-x-[50%]"
        >
          <Cover
            coverArr={IgdbCovers}
            number={2}
            className="absolute top-0 translate-x-[50%]"
          >
            <Cover
              coverArr={IgdbCovers}
              number={3}
              className="absolute top-0 translate-x-[50%]"
            >
              <Cover
                coverArr={IgdbCovers}
                number={4}
                className="absolute top-0 translate-x-[50%]"
              />
            </Cover>
          </Cover>
        </Cover>
      </Cover>
    </div>
  );
}
