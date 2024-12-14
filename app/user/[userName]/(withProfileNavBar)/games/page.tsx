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
import TypeLink from './components/ClientContent/components/TypeLink'
import NotFound from '@/app/not-found'
import typeLinks from './util/typeLinks'
import ThereAreNot from '@/components/ThereAreNot'
import ClientContent from './components/ClientContent/ClientContent'


export default async function page({params,searchParams}:any) 
{
  const {userName} = params
  const{page:ogPage,type="all"}= searchParams

  const page =Number(ogPage||1)

  const {res,err} =JSON.parse(await getUser({userName}))
  if(res.length===0||err)return NotFound()
  const user = res[0] as user

  return <ClientContent userName={userName} page={page} type={type} userId={user.id} />
}


/* 

  const {res,err} =JSON.parse(await getUser({userName}))
  const user = res[0] as user
  if(err)return NotFound()
    
  const {res:results} = JSON.parse(await getGamesByPage({user_id:user.id,limit:40,offset:getOffset(page,40),type})) 
  const {games,quantity}=results as {games:Array<game>,quantity:string}
  
  const ids = games.map(game=>game.game_id)

  const igdbGames = await getFullGameIGDB({ids,limit:40})

  const finalGames = getFinalGames({games,igdbGames}).sort((a, b) => b.score - a.score)

  return (
    <>
      <span className=" text-text text-[14.4px] block mb-[.6rem]">
        {quantity} Games
      </span>
      <div className='flex gap-[.5rem] mb-[1rem]'>
      {
        typeLinks.map((link,pos)=>
        (
          <TypeLink key={pos} type={link.type} currentType={type} userName={userName}/>
        ))
      }
      </div>
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
      {
        finalGames.length===0&&<ThereAreNot topic={type==="all" ? "games":`${type} games`} />
      }
      <PaginationPanel maxBypage={40} page={page} path='/user/lelosss/games' allElements={Number(quantity)}/>
    </>
  ); */