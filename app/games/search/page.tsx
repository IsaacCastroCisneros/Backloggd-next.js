import igdb from '@/util/igdb'
import React from 'react'
import Results from './components/Results/Results'
import Error from '@/components/Error'
import gameCardData from '../../../interfaces/gameCardData'
import getCoverDate from '@/util/getCoverDate'
import getFullGame from '@/util/getFullGameIGDB'


export default async function page({searchParams}:any) 
{
  const{game,offset}=searchParams
  if(!game)return <Error>An Error Was Occurred</Error>
  
  const gameCardDataArr = await getFullGame({game,offset})
  
  
  return (
    <Results results={gameCardDataArr||[]} offset={offset||0} game={game}/>
  )
}
