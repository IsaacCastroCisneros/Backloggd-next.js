import get from '@/server/get'
import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import { game } from '@/interfaces/game'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import GameCard from '@/components/GameCard/GameCard'
import getGamesByPage from '@/server/getGamesByPage'


export default async function page({params}:any) 
{
  const {userName} = params
  const {res} =JSON.parse(await getUser({userName})) 
  const user = res[0] as user
  const {res:games} = JSON.parse(await getGamesByPage({user_id:user.id,limit:50,offset:0})) 
  const myGames = games as Array<game>
  
  const ids = myGames.map(game=>game.game_id)

  const finalGames = await getFullGameIGDB({ids})

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(93.59px,1fr))] gap-[.5rem]'>
      {finalGames.map((game) => (
        <GameCard isMenuSmall={true} key={game.id} position={null} {...game} />
      ))}
    </div>
  );
}
