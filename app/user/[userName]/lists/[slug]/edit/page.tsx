import React from 'react'
import ClientContent from './components/ClientContent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { notFound } from 'next/navigation'
import get from '@/server/get'
import igdb from '@/util/igdb'
import listItem from '../../interfaces/listItem'
import { v4 as uuidv4 } from 'uuid'

export default async function page({params}:any) 
{
  const{slug}=params
  const session = await getServerSession(authOptions)
  if(session===null)return notFound()
  const{res:list}=JSON.parse(await get({query:"select * from gameList where slug=?",data:[slug]})) 
  const{res:gameList}=JSON.parse(await get({query:"select * from gameListItem where list_id=?",data:[list[0].id]})) 
  const{res:games}=JSON.parse(await get({query:"select * from game where id in (?)",data:[gameList.map(game=>game.game_id)]})) 


  async function gettingGameData(id:string):Promise<listItem>
  {
    const {res} = await igdb({type:"games",query:`where id=${id}; fields *;`})
    const {cover,name,id:igdbId}= res[0]

    let finalCover=""

    if(cover)
    {
      const {res}= await igdb({type:"covers",query:`where id=${cover}; fields url;`})
      finalCover = res[0].url
    }

    return {name,id:igdbId,listId:uuidv4(),cover:finalCover}
  }

  const lol = await Promise.all(games.map(async(game)=>gettingGameData(game.game_id)))

  console.log(lol)

  return (
    <ClientContent/>
  )
}
