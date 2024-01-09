"use client"

import React from 'react'
import Option from './components/Option'
import { usePathname } from 'next/navigation'

export default function Navbar() 
{
  const path = usePathname()
  const pathSplitted = path? path.split("/"):[]

  const isActive=
  {
    profile:pathSplitted.length===3,
    games:pathSplitted[3]==="games",
    lists:pathSplitted[3]==="lists",
    reviews:pathSplitted[3]==="reviews",
  }

  return (
    <nav className='bg-border2 py-[3px] rounded-[.3rem]'>
        <ul className='flex'>
            <Option href={`/user/${pathSplitted[2]}`} label="profile" isActive={isActive.profile} />
            <Option href={`${path}/games`} label="games" isActive={isActive.games} />
            <Option href={`${path}/lists`} label="lists" isActive={isActive.lists} />
            <Option href={`${path}/reviews`} label="reviews" isActive={isActive.reviews} />
        </ul>
    </nav>
  )
}
