import get from '@/server/get'
import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import { game } from '@/interfaces/game'
import igdb from '@/util/igdb'
import Review from './components/Review'
import review from './interfaces/review'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import getOffset from '@/components/PaginationPanel/util/getOffset'
import PaginationPanel from '@/components/PaginationPanel/PaginationPanel'


export default async function page({params,searchParams}:any) 
{

  const page =Number(searchParams.page||1)
  const {userName} = params
  const {res} =JSON.parse(await getUser({userName}))
  const user = res[0] as user

  const {res:all}=JSON.parse(await get({query:"select count(*) from game where user_id=? and review!=?",data:[user.id,""]})) 
  const allLists = all[0]["count(*)"]
  const {res:results}=JSON.parse(await get({query:"select * from game where user_id=? and review!=? limit 15 offset ?",data:[user.id,"",getOffset(page,15)]})) 

  const myPlatforms=results.reduce((final,plat)=>
    {
      if(plat.platform!=="none")
      {
        final.push(plat.platform)
      }
      return final
    },[]).join(",")
  
  const{res:platforms}=await igdb({type:"platforms",query:`where id=(${myPlatforms}); fields name; limit 50;`})

  const games = await getFullGameIGDB({ids:results.map((res:any)=>(res.game_id))})
  const reviews:Array<review> = results.map((res:game)=>
  {
    const{score,status,review,game_id}=res
    let finalReview:review|{}={}


     games.forEach((game)=>
     {
        if(game.id===game_id)
        {
          const{name,slug,date,platforms:myPlatform}=game
          const myPltform = platforms.find(plat=>plat.id===myPlatform[0])
          const finalPlat= myPltform||{name:"TBD"}
          
          finalReview={name,slug,platform:finalPlat.name,date,score,status,review}
        }
     })

     return finalReview
  })


  return (
    <div className='mt-[2rem]'>
      {
        reviews.map((review,pos)=>
        (
          <Review {...review}  key={pos}/>
        ))
      }
      <PaginationPanel allElements={allLists} path={`/user/${userName}/reviews`} page={page} maxBypage={15} />
    </div>
  )
 return null
}
