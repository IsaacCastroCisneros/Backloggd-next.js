"use client"

import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'
import gameCardData from '@/interfaces/gameCardData'
import React, { useState } from 'react'
import Menu from './components/Menu/Menu'
import { useSession } from 'next-auth/react'
import LoginForLogLink from '../LoginForLogLink/LoginForLogLink'

export const gameCard = React.createContext<{gameCardData:gameCardData|null}>({gameCardData:null})

interface props extends gameCardData
{
  
}

export default function GameCard(props:props) 
{
  const{cover,name}=props
  const src = choosingImgSize({ url: cover || "", size: "cover_big" })
  const[hover,setHover]=useState<boolean>(false)
  const {data}=useSession()
  const {user}=data||{user:null}

  const value=
  {
    gameCardData:props
  }

  return (
    <gameCard.Provider value={value}>
      <div
        className="relative rounded-[4px] border-[1px] border-field hover:border-gray"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          width={173.8}
          height={234}
          className={`object-cover ${
            hover ? "brightness-[45%]" : ""
          } duration-200`}
          src={src}
          alt="game card"
        />
        {hover && (
          <>
            <div className="flex absolute w-full h-full top-0 left-0 justify-center items-center">
              <span className="text-[#fff] font-bold text-[14px] pointer-events-none">
                {name}
              </span>
            </div>
            {user && (
              <div className="absolute bottom-[.5rem] left-0 w-full flex justify-center items-center">
                <Menu />
              </div>
            )}
            {!user && <LoginForLogLink />}
          </>
        )}
      </div>
    </gameCard.Provider>
  );
}
