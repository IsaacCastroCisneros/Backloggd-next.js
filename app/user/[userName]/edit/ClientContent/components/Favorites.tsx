"use client"
import React, { useContext } from 'react'
import Favorite from './components/Favorite'
import { context } from '../context/context'


export default function Favorites() 
{
  const{favorites}=useContext(context)

  return (
    <div className="flex h-[300px] w-full max-w-[100%] mx-auto gap-[1rem] mt-[4rem] relative">
      {favorites.map((fav) => (
        <Favorite key={fav.pos} favorite={fav} />
      ))}
      <span className="text-[#fff] text-[16px] absolute left-0 translate-y-[-120%]">
        Favorite Games
      </span>
    </div>
  );
}


