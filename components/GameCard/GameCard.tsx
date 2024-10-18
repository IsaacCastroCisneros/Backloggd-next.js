"use client"

import choosingImgSize from '@/util/choosingImgSize'
import gameCardData from '@/interfaces/gameCardData'
import React, { useState } from 'react'
import Menu from './components/Menu/Menu'
import { useSession } from 'next-auth/react'
import LoginForLogLink from '../LoginForLogLink'
import user from '@/interfaces/user'
import favoritePosition from '@/types/favoritePosition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown'
import useScoreByUser from '@/hooks/useScoreByUser'
import score from '../../types/score'
import { StaticScore } from '../StaticScore/StaticScore'
import Link from 'next/link'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

export const gameCard = React.createContext<{
  gameCardData: gameCardData | null;
  user: user | null;
  isMenuSmall: boolean;
  initialScore: score;
}>({ gameCardData: null, user: null, isMenuSmall: false, initialScore: 0 });

interface props extends gameCardData
{
  position:favoritePosition
  isMenuSmall?:boolean
  isScore?:boolean
  size?:"normal"|"small"
}

export default function GameCard(props:props) 
{
  const{cover,name,position,isMenuSmall=false,size="normal",id,isScore=false,slug}=props
  const src = choosingImgSize({ url: cover || "", size: "cover_big" })
  const[hover,setHover]=useState<boolean>(false)
  const {data}=useSession()
  const {user}=data||{user:null}

  const initialScore = useScoreByUser({gameId:id,user:user as user})

  const value=
  {
    gameCardData:props,
    user:user as user,
    isMenuSmall,
    initialScore
  }

  const stylesBySizeOptions = {
    small: {
      name: "text-[12px]",
      LoginForLogLinkStyles:
        "text-[13px] px-[.5rem] py-[.2rem] absolute left-[50%] translate-x-[-50%] bottom-[.4rem]",
    },
    normal: {
      name: "text-[14px]",
      LoginForLogLinkStyles:
        "absolute left-[50%] translate-x-[-50%] bottom-[.4rem]",
    },
  };

  const {name:nameBySize,LoginForLogLinkStyles}=stylesBySizeOptions[size]

  return (
    <gameCard.Provider value={value}>
      <div
        className="relative rounded-[4px] border-[1px] border-field hover:border-gray flex items-center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link href={`/games/${slug}`} className=" overflow-hidden">
          {position === "king" && (
            <div className="absolute top-0 translate-y-[calc(-100%_-_.2rem)] text-myYellow w-full flex justify-center">
              <FontAwesomeIcon icon={faCrown} />
            </div>
          )}
          <img
            width={173.8}
            height={234}
            className={`max-h-[2341px] object-cover opacity-0 pointer-events-none`}
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co4ahr.jpg"
            alt="game card"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center overflow-hidden">
            <img
              width={173.8}
              height={234}
              className={`object-cover rounded-[4px] ${
                hover ? "brightness-[45%]" : ""
              } duration-200`}
              src={src || "/img/no_image-eee1d555ae021e9cf0ca691c0e9ec60a.jpg"}
              alt="game card"
            />
            {!src && (
              <span className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-gray3">
                <FontAwesomeIcon icon={faGamepad} />
              </span>
            )}
          </div>
          {hover && (
            <>
              <div className="flex absolute w-full h-full top-0 left-0 justify-center items-center">
                <span
                  className={`text-[#fff] font-bold ${nameBySize} pointer-events-none text-center mob:text-[12px] mob1:text-[9px]`}
                >
                  {name}
                </span>
              </div>
            </>
          )}
        </Link>
        {user && (
          <Menu
            className={`absolute bottom-[.5rem] left-[50%] translate-x-[-50%] w-fit flex justify-center items-center ${
              hover
                ? "opacity-1 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />
        )}
        {!user && hover && (
          <LoginForLogLink className={LoginForLogLinkStyles} />
        )}
        {user && isScore && (
          <div className="absolute left-[50%] translate-x-[-50%] translate-y-[100%] bottom-0">
            <StaticScore score={initialScore} />
          </div>
        )}
      </div>
    </gameCard.Provider>
  );
}
