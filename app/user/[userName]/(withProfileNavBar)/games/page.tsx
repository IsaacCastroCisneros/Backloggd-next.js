import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import { game } from '@/interfaces/game'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import GameCard from '@/components/GameCard/GameCard'
import getGamesByPage from '@/server/getGamesByPage'
import getFinalGames from '@/util/getFinalGames'
import PaginationPanel from '@/components/PaginationPanel/PaginationPanel'
import getOffset from '@/components/PaginationPanel/util/getOffset'


export default async function page({params,searchParams}:any) 
{
  const {userName} = params
  const page =Number(searchParams.page||1)

  const {res} =JSON.parse(await getUser({userName}))
  const user = res[0] as user
  const {res:results} = JSON.parse(await getGamesByPage({user_id:user.id,limit:40,offset:getOffset(page,40)})) 
  const {games,quantity}=results as {games:Array<game>,quantity:string}
  
  const ids = games.map(game=>game.game_id)

  const igdbGames = await getFullGameIGDB({ids,limit:40})

  const finalGames = getFinalGames({games,igdbGames}).sort((a, b) => b.score - a.score)

  return (
    <>
      <span className=" text-text text-[14.4px] block mb-[.6rem]">
        {quantity} Games
      </span>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(93.59px,1fr))] gap-x-[.5rem] gap-y-[2rem]">
        {finalGames.map((game) => (
            <GameCard
              key={game.id}
              isMenuSmall={true}
              position={null}
              isScore={true}
              size='small'
              {...game}
            />
        ))}
      </div>
      <PaginationPanel maxBypage={40} page={page} path='/user/lelosss/games' allElements={Number(quantity)}/>
    </>
  );
}
