import React from 'react'
import ClientContent from './components/ClientContent'
import { notFound } from 'next/navigation'
import get from '@/server/get'
import gettingIdsFromIgdb from './util/gettingIdsFromIgdb'
import authorizeUser from '@/util/authorizeUser'
import NotFound from '@/app/not-found'


export default async function page({params}:any) 
{
  const{slug,userName}=params
  const{res,err}=await authorizeUser({userName})
  if(err) return NotFound()

  const{authorized,user}=res[0]

  if(!authorized)return NotFound()

  const{res:list}=JSON.parse(await get({query:"select * from gameList where slug=?",data:[slug]})) 
  if(list.length===0)return notFound()
  const listData = list[0]


  const{res:gameList}=JSON.parse(await get({query:"select * from gameListItem where list_id=?",data:[listData.id]})) 

  if(gameList.length===0)
  return (
    <ClientContent lists={[]} listData={listData} user={user} />
  )

  const {games,lists} = await gettingIdsFromIgdb(gameList)
  let finalList= lists

  if(gameList.length!==games.length)
  {
    const counts = gameList.reduce((acc:any, game:any) => {
      acc[game.game_id] = (acc[game.game_id] || 0) + 1;
      return acc;
    }, {});
    
    const restOfTheGameLists= gameList.filter((game:any)=> counts[game.game_id] > 1 && counts[game.game_id]-- > 0);
    
    const {lists} = await gettingIdsFromIgdb(restOfTheGameLists)

    finalList=[...finalList,...lists]
  }


  return (
    <ClientContent lists={finalList} listData={listData} user={user} />
  )
}
