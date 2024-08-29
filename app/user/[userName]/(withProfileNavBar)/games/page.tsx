import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import { game } from '@/interfaces/game'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import GameCard from '@/components/GameCard/GameCard'
import getGamesByPage from '@/server/getGamesByPage'
import gameCardData from '@/interfaces/gameCardData'
import score from '@/types/score'
import getFinalGames from '@/util/getFinalGames'

interface finalGame extends gameCardData
{
  score:score
}

export default async function page({params}:any) 
{
  const {userName} = params
  const {res} =JSON.parse(await getUser({userName}))
  const user = res[0] as user
  const {res:results} = JSON.parse(await getGamesByPage({user_id:user.id,limit:50,offset:0})) 
  const {games,quantity}=results as {games:Array<game>,quantity:string}
  
  const ids = games.map(game=>game.game_id)

  const igdbGames = await getFullGameIGDB({ids})

  const finalGames = getFinalGames({games,igdbGames})

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
    </>
  );
}
