import React, { useContext } from 'react'
import favorite from '../../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../../../../../types/favoritePosition'
import gameCardData from '@/interfaces/gameCardData'
import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'
import { global } from '@/app/context/GlobalContext'
import InputSearcherOption from '@/components/InputSearcherOption'

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
    <InputSearcherOption label={name} date={date}  onClick={handleUpadteFavorite}/>
  );
}
