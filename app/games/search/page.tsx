import React from 'react'
import Results from './components/Results/Results'
import Error from '@/components/Error'


export default async function page({searchParams}:any) 
{
  const{game,offset}=searchParams
  if(!game)return <Error>An Error Was Occurred</Error>

  return (
    <Results offset={offset||0} game={game}/>
  )
}
