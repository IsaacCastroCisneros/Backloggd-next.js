"use client"
import React, { useContext } from 'react'
import { context } from '../ClientContent'
import CardPic from '@/components/CardPic/CardPic'


export default function LeftContainer() 
{
  const{gameFinalData}=useContext(context)
  const{cover}=gameFinalData

  return (
    <div className='w-[198px]'>
      {/* <CardPic src={cover} /> */}
    </div>
  )
}
