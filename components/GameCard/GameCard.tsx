"use client"

import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'
import gameCardData from '@/interfaces/gameCardData'
import React, { useState } from 'react'
import Menu from './components/Menu/Menu'
import { useSession } from 'next-auth/react'
import LoginForLogLink from '../LoginForLogLink/LoginForLogLink'
import user from '@/interfaces/user'
import favoritePosition from '@/types/favoritePosition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown'

export const gameCard = React.createContext<{
  gameCardData: gameCardData | null;
  user: user | null;
  isMenuSmall: boolean;
}>({ gameCardData: null, user: null, isMenuSmall: false });

interface props extends gameCardData
{
  position:favoritePosition
  isMenuSmall?:boolean
}

export default function GameCard(props:props) 
{
  const{cover,name,position,isMenuSmall=false}=props
  const src = choosingImgSize({ url: cover || "", size: "cover_big" })
  const[hover,setHover]=useState<boolean>(false)
  const {data}=useSession()
  const {user}=data||{user:null}

/*   const sizes =
  {
    normal:"",
    small:""
  }

  const finalSize = sizes[size] */

  const value=
  {
    gameCardData:props,
    user:user as user,
    isMenuSmall
  }


  return (
    <gameCard.Provider value={value}>
      <div
        className="relative rounded-[4px] border-[1px] border-field hover:border-gray flex items-center "
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {position === "king" && (
          <div className="absolute top-0 translate-y-[calc(-100%_-_.2rem)] text-myYellow w-full flex justify-center">
            <FontAwesomeIcon icon={faCrown} />
          </div>
        )}
        <img
          width={173.8}
          height={234}
          className={`max-h-[2341px] object-cover rounded-[4px] ${
            hover ? "brightness-[45%]" : ""
          } duration-200`}
          src={src}
          alt="game card"
        />
        {hover && (
          <>
            <div className="flex absolute w-full h-full top-0 left-0 justify-center items-center">
              <span className="text-[#fff] font-bold text-[14px] pointer-events-none text-center mob:text-[12px] mob1:text-[9px]">
                {name}
              </span>
            </div>
          </>
        )}
        {user && (
          <div
            className={`absolute bottom-[.5rem] left-0 w-full flex justify-center items-center ${
              hover
                ? "opacity-1 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Menu  />
          </div>
        )}
        {!user && hover && <LoginForLogLink />}
      </div>
    </gameCard.Provider>
  );
}
