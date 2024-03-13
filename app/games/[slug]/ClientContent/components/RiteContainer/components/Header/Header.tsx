import React, { useContext } from 'react'
import { context } from '../../../../ClientContent'
import gameFinalData from '@/app/games/[slug]/interfaces/gameFinalData'

export default function Header() 
{
  const{gameFinalData}=useContext(context) as {gameFinalData:gameFinalData}
  const{name,date,developer,publisher}=gameFinalData

  return (
    <div className="mt-[21rem]">
    <h1 className="text-[2.5rem] text-[#fff] font-bold">{name}</h1>
    <p className="text-text7 text-[20px]">released on</p>
  </div>
  )
}
