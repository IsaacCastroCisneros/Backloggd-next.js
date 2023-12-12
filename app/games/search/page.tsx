import igdb from '@/util/igdb'
import React from 'react'
import Results from './components/Results/Results'
import Error from '@/components/Error'
import gameCardData from '../../../interfaces/gameCardData'


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

  let coversIds:Array<string>=[]
  let yearsIds:Array<string>=[]

  games.forEach((game:any)=>
    {
      if(game.cover!==undefined)
      {
        coversIds=[...coversIds,game.cover]
      }
      if(game.release_dates!==undefined)
      {
        yearsIds = [...yearsIds, game.release_dates[0]];
      }
    })

  const {res:covers} = await igdb({type:"covers",query:`where id=(${coversIds.join(',')}); fields url,game;`})
  const {res:dates} = await igdb({type:"release_dates",query:`where id=(${yearsIds.join(',')}); fields y,game;`})

  if(covers===null||dates===null)
  {
    return <Error>An Error Was Occurred</Error>
  }

  let gameCardDataArr:Array<gameCardData>=[]

  games.forEach((gcd:any)=>
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
            myGcd.cover=c.url
          }
       })

       dates.forEach((y:any)=>
       {
          if(y.game===gcd.id)
          {
            myGcd.date=y.y
          }
       })
       
       gameCardDataArr= [...gameCardDataArr,myGcd]
    })
   

  return (
    <Results results={gameCardDataArr||[]} offset={offset||0} game={game}/>
  )
}
