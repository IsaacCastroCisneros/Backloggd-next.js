import React from 'react'
import result from '../interfaces/result'
import favorite from '../../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../../edit/ClientContent/types/cardPosition'
import igdb from '@/util/igdb'
import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'

interface props extends result
{
  updateFavorites:(newFavorite:favorite)=>void
  pos:cardPosition
}

export default function Option(props:props) 
{
  const{id,name,cover,updateFavorites,pos}=props

  async function handleUpadteFavorite()
  {
    let myCover=""
    if(cover)
    {
      const{res}= await igdb({type:"covers",query:`where id=(${cover}); fields url,game;`})
      const{url}=res[0] as {url:string}
      myCover=choosingImgSize({url,size:"cover_big"})
    }
  
    updateFavorites({id,cover:myCover,pos,isIn:true})
  }

  return (
    <button className='bg-border2 hover:bg-bg w-full px-[.3rem] py-[.2rem] text-text4 text-left border-b-[1px] border-border' onClick={handleUpadteFavorite}>{name}</button>
  )
}
