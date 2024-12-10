import user from '@/interfaces/user'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Session, getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import ClientContent from './ClientContent/ClientContent'
import getFavorites from '../server/getFavorites'
import ErrMsg from '@/components/ErrMsg'
import favorite from './ClientContent/interfaces/favorite'
import igdb from '@/util/igdb'
import favoritePosition from '@/types/favoritePosition'
import choosingImgSize from '@/util/choosingImgSize'
import updatingFavoritesByIndex from './ClientContent/util/updatingFavoritesByIndex'
import defaulFavorites from './ClientContent/util/defaultFavorites'
import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'

interface values
{
  username:string
  twitter:string
  bio:string
}

export default async function page() 
{

  
  try
  {
    const session = await getServerSession(authOptions)
    if(session===null)return notFound()
  
    const{user}=session as Session
    const{id}=user as user
    const {res:favorites} = JSON.parse(await getFavorites(id)) as {res:Array<{game_id:number,favorite_position:string}> }
    let initialFavorites:Array<favorite>=[]

    if(favorites.length>0)
    {
      const favIdArr=favorites.map(fav=>fav.game_id)  
      const{res:coversIds}=await igdb({type:"games",query:`where id=(${favIdArr.join(",")}); fields cover,slug;`})
      const coverIdsArr=coversIds.filter(cov=>cov.cover).map(cov=>cov.cover)
      const{res:covers}=await igdb({type:"covers",query:`where id=(${coverIdsArr.join(",")}); fields url,game;`})

      let finalCovers = covers

      if(favorites.length!==covers.length)
      {
        const withNoCover = coversIds
          .filter((cov) => !cov.cover)
          .map((cov) => ({
            game: cov.id,
            url: null,
          }));
        
       finalCovers = [...finalCovers,...withNoCover]
      }
  
      initialFavorites = finalCovers.map(cov=>
        {
          const pos = favorites.find(fav=>fav.game_id===cov.game) || {favorite_position:"0"}
      
          return{
            isIn:true,
            cover:choosingImgSize({url:cov.url,size:"cover_big"}),
            id:cov.game,
            slug:"",
            pos:pos.favorite_position as favoritePosition
          }
        })
    }
    
    const finalInitialFavorites=updatingFavoritesByIndex({favorites:defaulFavorites,newFavorite:initialFavorites})

    return (
      <ClientContent {...user as user} initialFavorites={finalInitialFavorites} />
    );
  }
  catch(err)
  {
     return <ErrMsg/>
  }

}
