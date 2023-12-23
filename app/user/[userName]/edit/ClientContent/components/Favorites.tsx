"use client"
import React, { useContext } from 'react'
import Favorite from './components/Favorite'
import { context } from '../context/context'


export default function Favorites() 
{
  const{favorites}=useContext(context)

  return (
    <div className='flex h-[300px] w-full max-w-[100%] mx-auto gap-[1rem]'>
     {
        favorites.map(fav=>
        (
            <Favorite key={fav.pos} favorite={fav} />
        ))
     }
    </div>
  )
}


