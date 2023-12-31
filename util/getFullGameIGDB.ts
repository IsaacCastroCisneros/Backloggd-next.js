"use server"

import igdb from './igdb'
import getCoverDate from './getCoverDate'
import gameCardData from '@/interfaces/gameCardData'

interface props
{
    game:string
    offset?:string
    areDates?:boolean
}

export default async function getFullGameIGDB({game,offset,areDates=true}:props):Promise<Array<gameCardData>> 
{

    const{res:games,err}=await igdb({type:"games",query:`search "${game}"; fields *; limit 25; offset ${offset||0};`})
    if(games===null)
    {
      console.log(err)
      return []
    }
    
    const{coversIds,dateIds}=getCoverDate({games})

    async function getCovers()
    {
      return await igdb({type:"covers",query:`where id=(${coversIds}); fields url,game;`})
    }
    async function getDates()
    {
      return areDates ? await igdb({type:"release_dates",query:`where id=(${dateIds}); fields y,game;`}):{res:[]} 
    }

    const[fullCovers,fullDates] = await Promise.all([getCovers(),getDates()])
    const{res:covers}=fullCovers
    const{res:dates}=fullDates

    if(covers===null||dates===null)
    {
      return []
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

       if(!areDates)return myGcd
  
       dates.forEach((y:any)=>
       {
          if(y.game===gcd.id)
          {
            myGcd.date=y.y
          }
       })
       
       return myGcd
    })

    return gameCardDataArr
}


