import React from 'react'
import getUser from '../server/getUser'
import user from '@/interfaces/user'
import getFavorites from '../server/getFavorites'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import GameCard from '@/components/GameCard/GameCard'
import gameCardData from '@/interfaces/gameCardData'
import favoriteDB from './interfaces/favoriteDB'
import favoritePosition from '@/types/favoritePosition'

interface finalFavorite extends gameCardData 
{
  position:favoritePosition
}

export default async function page({params}:any) 
{
  const{userName}=params
  const{res}=JSON.parse(await getUser({userName})) 
  console.log(userName)
  const{bio,id}=res[0] as user
  const {res:favorites} = JSON.parse(await getFavorites(id)) as {res:Array<favoriteDB>,err:null}
  const ids=favorites.map((fav)=>fav.game_id)
  const fullFavorites:Array<gameCardData> = await getFullGameIGDB({ids})  

  const finalFavorites:Array<finalFavorite>= fullFavorites.map(fav=>
    {
      const one = favorites.find((favo)=>favo.game_id===fav.id) || {favorite_position:"0"}
      return {...fav,position:one.favorite_position}
    })

  const king = finalFavorites.find(fav=>fav.position==="king")

  const finalFavoritesSorted = finalFavorites.filter(finalFavorite=>finalFavorite.position!=="king").sort(
    (a, b) => Number(a.position) - Number(b.position)
  );

  if(king)
  {
    let pos = Math.floor(finalFavoritesSorted.length/2)
    finalFavoritesSorted.splice(pos,0,king)
  }


  return (
    <div className='flex gap-[2.5rem] mob:flex-col'>
      <aside className='w-[160px] mob:text-mobText mob:w-full'>
        <span className='text-text4 capitalize block border-b-[1px] border-border pb-[.1rem]'>
           bio
        </span>
        <span className='text-[#fff]'>
            {bio}
        </span>
      </aside>
      <section className='flex-1'>
        <span className='text-text4 capitalize font-medium text-[32px] mob:text-[20px] block mb-[1rem]'>
            favorite games
        </span>
        <div className='flex w-full gap-[.6rem] justify-center'>
          {
            finalFavoritesSorted.map((fav,pos)=>(<GameCard {...fav} key={pos}/>))
          }
        </div>
      </section>
    </div>
  )

}
