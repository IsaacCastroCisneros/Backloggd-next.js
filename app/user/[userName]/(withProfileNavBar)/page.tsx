import React from 'react'
import getUser from '../server/getUser'
import user from '@/interfaces/user'
import getFavorites from '../server/getFavorites'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import GameCard from '@/components/GameCard/GameCard'
import gameCardData from '@/interfaces/gameCardData'

export default async function page({params}:any) 
{
  const{userName}=params
  const{res,err}=await getUser({userName})
  const{bio,id}=res[0] as user
  const {res:favorites} = JSON.parse(await getFavorites(id)) 
  const ids=favorites.map((fav:{game_id:string})=>fav.game_id)
  const fullFavorites:Array<gameCardData> = await getFullGameIGDB({ids})

  const finalFavorites= fullFavorites.map(fav=>
    {
      const one = favorites.find(favo=>favo.game_id===fav.id)
      return {...fav,position:one.favorite_position}
    })

  const thereIsKing = finalFavorites.some(fav=>fav.position==="king")
  const finalFavoritesSorted= finalFavorites.sort(fav=>fav.position)
  
  console.log(finalFavorites)
  
  return (
    <div className='flex mt-[1rem] gap-[2.5rem]'>
      <aside className='w-[160px]'>
        <span className='text-text4 capitalize block border-b-[1px] border-border pb-[.1rem]'>
           bio
        </span>
        <span className='text-[#fff]'>
            {bio}
        </span>
      </aside>
      <section className='flex-1'>
        <span className='text-text4 capitalize font-medium text-[32px]'>
            favorite games
        </span>
        <div className='flex w-full gap-[.6rem]'>
          {
            fullFavorites.map((fav,pos)=>(<GameCard {...fav} key={pos}/>))
          }
        </div>
      </section>
    </div>
  )

}
