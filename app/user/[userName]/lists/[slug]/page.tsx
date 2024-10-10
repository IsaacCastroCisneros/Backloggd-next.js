import ErrMsg from '@/components/ErrMsg'
import GameCard from '@/components/GameCard/GameCard'
import Separator from '@/components/Separator'
import pool from '@/config/db'
import list from '@/interfaces/list'
import user from '@/interfaces/user'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import get from '@/server/get'
import getFinalGames from '@/util/getFinalGames'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import { RowDataPacket } from 'mysql2'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

export default async function page({params}:any) 
{
  try
  {
    const session = await getServerSession(authOptions)
    const user = session?.user as user
    const{slug}=params
    const{res:list,err}=JSON.parse(await get({query:"select * from gameList where slug=?",data:[slug]}))
    if(err)return <ErrMsg/>
    const{id,name,description}=list[0] as list 
    const { res: gameIds } = JSON.parse(
      await get({
        query: "select game_id from gameListItem where list_id=?",
        data: [id],
      })
    ); 
    const { res: games } = JSON.parse(
      await get({
        query: "select game_id from game where id in (?)",
        data: [gameIds.map((game: { game_id: string }) => game.game_id)],
      })
    ); 

    const igdbGames = await getFullGameIGDB({
      ids: games.map((game: { game_id: string }) => game.game_id),
    });

    const finalGames = getFinalGames({games,igdbGames})

    return (
      <div>
        <h1 className="text-[40px] text-[#fff] font-semibold">{name}</h1>
        <p className="text-text4 mb-[.8rem]">{description}</p>
        <div className="flex gap-[2rem]">
          <section className="flex-1">
            <span className="text-text text-[14px]">
              {gameIds.length}&nbsp; Games
            </span>
            <Separator className="my-[.5rem]" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(93.59px,1fr))] gap-x-[.5rem] gap-y-[2rem]">
              {finalGames.map((game) => (
                <GameCard
                  key={game.id}
                  isMenuSmall={true}
                  position={null}
                  size="small"
                  {...game}
                />
              ))}
            </div>
          </section>
          <section className="w-[285px]">
            <Link
              className="text-text2 font-medium hover:text-[#fff]"
              href={`/user/${user.username}`}
            >
              {user.username}
            </Link>
            <Separator className="my-[.5rem]" />
            <Link
              href={`${slug}/edit`}
              className="bg-gray3 text-[#fff] rounded-[4px] hover:bg-gray font-medium block text-center px-[12px] py-[6px]"
            >
              Edit List
            </Link>
          </section>
        </div>
      </div>
    );
  }
  catch(err)
  {
    console.log(err)
    return <ErrMsg/>
  }

}
