import get from '@/server/get'
import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import { game } from '@/interfaces/game'
import igdb from '@/util/igdb'
import choosingImgSize from '@/util/choosingImgSize'
import Review from './components/Review'
import review from './interfaces/review'

interface gameSlug extends game
{
  slug:string
}

export default async function page({params}:any) 
{
  const {userName} = params
  const {res} =JSON.parse(await getUser({userName}))
  const user = res[0] as user
  const {res:results}=JSON.parse(await get({query:"select * from game where user_id=? and review!=? limit 20",data:[user.id,""]})) 


  const lelos =results.map(async (game:gameSlug) => {
    const { platform, game_id, score, status,slug,review} = game;

    let finalGame: review = {
      name: "",
      username: user.username,
      releaseDate: 0,
      cover: "",
      score,
      status,
      platform: "none",
      slug,
      review
    };

     const { res,err } = await igdb({
       type: "games",
       query: `where id=${game_id}; fields *;`,
     });
        const { release_dates, cover, name } = res[0];
     

      if (release_dates) {
        const { res: releaseDate } = await igdb({
          type: "release_dates",
          query: `where id=${release_dates[0]}; fields y;`,
        });
        finalGame = { ...finalGame, releaseDate: releaseDate[0].y };
      }
      if (platform) {
        const { res: platformRes } = await igdb({
          type: "platforms",
          query: `where id=${platform}; fields name;`,
        });
        finalGame = { ...finalGame, platform: platformRes[0].name };
      }
      if (cover) {
        const { res: coverRes } = await igdb({
          type: "covers",
          query: `where id=${cover}; fields url;`,
        });
        finalGame = {
          ...finalGame,
          cover: choosingImgSize({ url: coverRes[0].url, size: "cover_big" }),
        };
      }

      return { ...finalGame, name };
  })
  
  const reviews: Array<review> = await Promise.all<Promise<review>>(lelos);
  

  return (
    <div className='mt-[2rem]'>
      {
        reviews.map((review,pos)=>
        (
          <Review {...review}  key={pos}/>
        ))
      }
    </div>
  )
}
