import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'
import gameCardData from '@/interfaces/gameCardData'
import React, { ImgHTMLAttributes } from 'react'

interface props extends gameCardData
{
  
}

export default function GameCard(props:props) 
{
  const{cover}=props
  const src = choosingImgSize({ url: cover || "", size: "cover_big" })

  return (
    <div>
      <img
        width={173.8}
        height={234}
        className=" object-cover"
        src={src}
        alt="game card"
      />
    </div>
  );
}
