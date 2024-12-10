"use client"

import React from 'react'
import Option from './components/Option'
import { usePathname } from 'next/navigation'

interface props
{
  userName:string
}

export default function Navbar({userName}:props) 
{

  const path = `/user/${userName}`
  const myPath = usePathname()
  const pathSplitted = myPath? myPath.split("/"):[]

  const isActive=
  {
    profile:pathSplitted.length===3,
    games:pathSplitted[3]==="games",
    lists:pathSplitted[3]==="lists",
    reviews:pathSplitted[3]==="reviews",
  }

  return (
    <nav className='bg-border2 py-[3px] rounded-[.3rem] mb-[1rem]'>
        <ul className='flex'>
            <Option href={path} label="profile" isActive={isActive.profile} />
            <Option href={`${path}/games`} label="games" isActive={isActive.games} />
            <Option href={`${path}/lists`} label="lists" isActive={isActive.lists} />
            <Option href={`${path}/reviews`} label="reviews" isActive={isActive.reviews} />
        </ul>
    </nav>
  )
}
