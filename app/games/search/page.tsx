import igdb from '@/util/igdb'
import React from 'react'
import Results from './components/Results/Results'
import Error from '@/components/Error'
import gameCardData from '../../../interfaces/gameCardData'
import getCoverDate from '@/util/getCoverDate'


export default async function page({searchParams}:any) 
{
  const{game,offset}=searchParams
  if(!game)return <Error>An Error Was Occurred</Error>
  const{res:games,err}=await igdb({type:"games",query:`search "${game}"; fields *; limit 25; offset ${offset||0};`})
  if(games===null)
  {
    console.log(err)
    return <Error>An Error Was Occurred</Error>
  }
  
  const{coversIds,dateIds}=getCoverDate({games})

  const {res:covers} = await igdb({type:"covers",query:`where id=(${coversIds}); fields url,game;`})
  const {res:dates} = await igdb({type:"release_dates",query:`where id=(${dateIds}); fields y,game;`})

  if(covers===null||dates===null)
  {
    return <Error>An Error Was Occurred</Error>
  }

  const gameCardDataArr:Array<gameCardData>=games.map((gcd:any)=>
  {
    const myGcd:gameCardData=
    {
      id:gcd.id,
      name:gcd.name,
      platforms:gcd.platforms||[]
    }

     covers.forEach((c:any)=>
     {
        if(c.game===gcd.id)
        {
          myGcd.cover = c.url;
        }
     })

     dates.forEach((y:any)=>
     {
        if(y.game===gcd.id)
        {
          myGcd.date=y.y
        }
     })
     
     return myGcd
  })

  
   

  return (
    <Results results={gameCardDataArr||[]} offset={offset||0} game={game}/>
  )
}
