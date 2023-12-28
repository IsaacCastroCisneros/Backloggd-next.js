import React, { MutableRefObject, useContext } from 'react'
import favorite from '../../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../../edit/ClientContent/types/cardPosition'
import gameCardData from '@/interfaces/gameCardData'
import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'
import { global } from '@/app/context/GlobalContext'

interface props extends gameCardData
{
  updateFavorites:(newFavorite:favorite)=>void
  pos:cardPosition
}

export default function Option(props:props) 
{
  const{setPopup}=useContext(global)
  const{id,name,cover,updateFavorites,pos,date}=props

  async function handleUpadteFavorite()
  {
    const myCover=cover ? choosingImgSize({url:cover,size:"cover_big"}) : ""
    updateFavorites({id,cover:myCover,pos,isIn:true})
    setPopup(prev=>({...prev,show:false}))
  }

  
  return (
    <button
      className="bg-border2 hover:bg-bg w-full px-[.3rem] py-[.2rem] text-text4 text-left border-b-[1px] border-border"
      onClick={handleUpadteFavorite}
    >
      {name}&nbsp;
      {
        date&&`(${date})`
      }
    </button>
  );
}
