import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import { game } from '@/interfaces/game'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import GameCard from '@/components/GameCard/GameCard'
import getGamesByPage from '@/server/getGamesByPage'
import gameCardData from '@/interfaces/gameCardData'
import score from '@/components/Score/types/score'

interface finalGame extends gameCardData
{
  score:score
}

export default async function page({params}:any) 
{
  const {userName} = params
  const {res} =JSON.parse(await getUser({userName})) 
  const user = res[0] as user
  const {res:games} = JSON.parse(await getGamesByPage({user_id:user.id,limit:50,offset:0})) 
  const myGames = games as Array<game>
  
  const ids = myGames.map(game=>game.game_id)

  const igdbGames = await getFullGameIGDB({ids})

  let finalGames:Array<finalGame>=[]

  igdbGames.forEach(igdbGame=>(myGames.forEach(myGame=>
    {
      if(igdbGame.id === myGame.game_id)
      {
        const finalGame:finalGame= {...igdbGame,score:myGame.score}
        finalGames = [...finalGames,finalGame]
      }
    })))


  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(93.59px,1fr))] gap-x-[.5rem] gap-y-[2rem]'>
      {finalGames.map((game) => (
        <GameCard isMenuSmall={true} key={game.id} position={null} {...game} />
      ))}
      {finalGames.map((game) => (
        <GameCard isMenuSmall={true} key={game.id} position={null} {...game} />
      ))}
      {finalGames.map((game) => (
        <GameCard isMenuSmall={true} key={game.id} position={null} {...game} />
      ))}
      {finalGames.map((game) => (
        <GameCard isMenuSmall={true} key={game.id} position={null} {...game} />
      ))}
    </div>
  )
}
