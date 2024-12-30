"use server"

import React from 'react'
import list from '../../../../../../../interfaces/list'
import get from '@/server/get'
import igdb from '@/util/igdb'
import Cover from './components/Cover'
import Link from 'next/link'
import user from '@/interfaces/user'

interface props extends list
{
  
}

export default async function List({id,name,slug}:props) 
{

  const [promise1,promise2] =  await Promise.all([
    get({
      query: "select * from game_list_item where list_id=? limit 5",
      data: id,
    }),
    get({
      query: "select count(*) from game_list_item where list_id=?",
      data: id,
    }),
  ]);
  
  const{res:coverLists}=JSON.parse(promise1) 
  const{res:count}=JSON.parse(promise2) 

  const listCount = count[0]["count(*)"]

  let games:{res:Array<any>,err:null|unknown} = {res:[],err:null}
  let igdbGames:{res:Array<any>}={res:[{url:""},{url:""},{url:""},{url:""},{url:""}]}

  if(coverLists.length>0)
  {
    games = JSON.parse(
      await get({
        query: "select game_id from game where id in (?)",
        data: [coverLists.map((item:any) => item.game_id)],
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

  const listUrl = `lists/${slug}` 

  return (
    <div className='flex flex-col'>
      <Link href={listUrl} className="relative h-[156px]">
        <Cover
          coverArr={IgdbCovers}
          number={0}
          className="absolute left-0 top-0 z-[5]"
        />
        <Cover
          coverArr={IgdbCovers}
          number={1}
          className="absolute left-0 translate-x-[50%] top-0 z-[4]"
        />
        <Cover
          coverArr={IgdbCovers}
          number={2}
          className="absolute left-0 translate-x-[100%] top-0 z-[3]"
        />
        <Cover
          coverArr={IgdbCovers}
          number={3}
          className="absolute left-0 translate-x-[150%] top-0 z-[2]"
        />
        <Cover
          coverArr={IgdbCovers}
          number={4}
          className="absolute left-0 translate-x-[200%] top-0 z-[1] mob0:hidden"
        />
      </Link>
      <Link className='text-text2 text-[20.8px] font-medium hover:text-[#fff] overflow-hidden whitespace-nowrap text-ellipsis' href={listUrl}>{name}</Link>
      <span className='text-text text-[12px]'>{listCount} Games</span>
    </div>
  );
}
