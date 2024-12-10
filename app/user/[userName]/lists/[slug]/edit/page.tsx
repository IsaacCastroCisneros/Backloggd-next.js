import React from 'react'
import ClientContent from './components/ClientContent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { notFound } from 'next/navigation'
import get from '@/server/get'
import igdb from '@/util/igdb'
import listItem from '../../interfaces/listItem'
import { v4 as uuidv4 } from 'uuid'
import getAllGames from '../util/getAllGames'
import user from '@/interfaces/user'

export default async function page({params}:any) 
{
  const{slug}=params
  const session = await getServerSession(authOptions)
  if(session===null)return notFound()
  const{res:list,err}=JSON.parse(await get({query:"select * from gameList where slug=?",data:[slug]})) 
  if(list.length===0)return notFound()
  const listData = list[0]

  const user = session?.user as user

  const{res:gameList}=JSON.parse(await get({query:"select * from gameListItem where list_id=?",data:[listData.id]})) 

  const { res: temGames } = JSON.parse(
    await get({
      query: "select * from game where id in (?)",
      data: [gameList.map((game: { game_id: string }) => game.game_id)],
    })
  ); 

  const games = getAllGames({temmpGames:temGames,ogGameList:gameList})  

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

  const lists = await Promise.all(
    games.map(async (game: { game_id: string }) =>
      gettingGameData(game.game_id)
    )
  );


  return (
    <ClientContent lists={lists} listData={listData} user={user} />
  )
}
