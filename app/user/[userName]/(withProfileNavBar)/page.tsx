import React from 'react'
import getUser from '../server/getUser'
import user from '@/interfaces/user'
import getFavorites from '../server/getFavorites'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import GameCard from '@/components/GameCard/GameCard'
import gameCardData from '@/interfaces/gameCardData'
import favoriteDB from './interfaces/favoriteDB'
import favoritePosition from '@/types/favoritePosition'
import Separator from '@/components/Separator'
import BigCount from './components/BigCount'
import get from '@/server/get'
import ThereAreNot from '@/components/ThereAreNot'
import Button from '@/components/Button'
import Link from 'next/link'

interface finalFavorite extends gameCardData 
{
  position:favoritePosition
}

export default async function page({params}:any) 
{
  const{userName}=params
  const{res}=JSON.parse(await getUser({userName})) 

  const{bio,id,username}=res[0] as user
  const {res:favorites} = JSON.parse(await getFavorites(id)) as {res:Array<favoriteDB>,err:null}
  const ids=favorites.map((fav)=>fav.game_id)
  const fullFavorites:Array<gameCardData> = await getFullGameIGDB({ids})  
  const {res:loggedCount} =JSON.parse(await get({query:"select count(*) from game where user_id=?",data:id})) 
  const gamesLoggedCount = loggedCount[0]["count(*)"]
  const {res:totalList} =JSON.parse(await get({query:"select count(*) from game_list where user_id=?",data:id})) 
  const totalListCount = totalList[0]["count(*)"]
  const {res:totalReviews} =JSON.parse(await get({query:`select count(*) from game where user_id=? and review!=""`,data:id})) 
  const totalReviewsCount = totalReviews[0]["count(*)"]

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
    <div className="flex gap-[2.5rem] mob:flex-col">
      <aside className="w-[160px] mob:text-mobText mob:w-full">
        <span className="text-text4 capitalize block border-b-[1px] border-border pb-[.1rem]">
          bio
        </span>
        <span className="text-[#fff]">{bio}</span>
      </aside>
      <section className="flex-1">
        <span className="text-text4 capitalize font-medium text-[32px] mob:text-[20px] block mb-[1rem]">
          favorite games
        </span>
        <div className="flex w-full gap-[.6rem] justify-center">
          {finalFavoritesSorted.map((fav, pos) => (
            <GameCard {...fav} key={pos} />
          ))}
        </div>
        {
          finalFavorites.length===0&&
          <div className='flex flex-col items-center w-full'>
            <ThereAreNot topic='favorites yet' />
            <Button className='mt-[1.5rem]'>
              <Link href={`/user/${username}/edit`}>
                Add Favorites Here!
              </Link>
            </Button>
          </div>
        }
        <Separator className='mt-[2rem]' />
        <div className='flex'>
          <BigCount label='Total Games Logged' count={gamesLoggedCount} />
          <BigCount label='Total Lists'  count={totalListCount} />
          <BigCount label='Total Reviews'  count={totalReviewsCount} />
        </div>
        <Separator className='mt-[1.8rem]' />
      </section>
    </div>
  );

}
