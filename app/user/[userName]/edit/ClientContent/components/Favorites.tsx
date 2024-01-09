"use client"
import React, { useContext } from 'react'
import Favorite from './components/Favorite'
import { context } from '../context/context'


export default function Favorites() 
{
  const{favorites}=useContext(context)

  return (
    <div className="flex h-[300px] w-full max-w-[100%] mx-auto gap-[1rem] mt-[4rem] relative mob:h-[150px] mob:gap-[.5rem] mob1:h-[100px]">
      {favorites.map((fav) => (
        <Favorite key={fav.pos} favorite={fav} />
      ))}
      <span className="text-[#fff] text-[16px] absolute left-0 translate-y-[-120%]">
        Favorite Games
      </span>
    </div>
  );
}


