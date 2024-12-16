"use client"

import React from 'react'
import PaginationPanel from '@/components/PaginationPanel/PaginationPanel'
import GameCard from '@/components/GameCard/GameCard'
import TypeLink from "./components/TypeLink"
import { useQuery } from 'react-query'
import gameByType from '../../interfaces/gameByType'
import getGamesByType from '../../server/getGamesByType'
import ThereAreNot from '@/components/ThereAreNot'
import typeLinks from '../../util/typeLinks'
import LoadingSpinner from '@/components/LoadingSpinner'
import gameCardData from '@/interfaces/gameCardData'

export default function ClientContent(props:gameByType) 
{

    const{page,type,userName}=props
    const{data,isLoading}=useQuery(["gamesByType",props],request,{refetchOnWindowFocus:false})

    const{finalGames,quantity}=data || {finalGames:[],quantity:""}

    async function request({queryKey}:any)
    {
       const[_key,props]=queryKey
       const{res}=JSON.parse(await getGamesByType(props)) 
       
       return res
    }

    return (
      <>
        <div className="flex gap-[.3rem] mb-[1rem]">
          {typeLinks.map((link, pos) => (
              <TypeLink
              key={pos}
              type={link.type}
              currentType={type}
              userName={userName}
              />
            ))}
        </div>
        {!isLoading && (
            <span className=" text-text text-[14.4px] block mb-[.6rem]">
            {quantity} Games
            </span>
        )}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(93.59px,1fr))] gap-x-[.5rem] gap-y-[2rem]">
          {!isLoading && (
            <>
              {finalGames.map((game:gameCardData) => (
                <GameCard
                  key={game.id}
                  isMenuSmall={true}
                  position={null}
                  isScore={true}
                  size="small"
                  {...game}
                />
              ))}
            </>
          )}
        </div>
        {finalGames.length === 0 &&!isLoading&& (
          <ThereAreNot topic={type === "all" ? "games" : `${type} games`} />
        )}
        {
           isLoading&&!data&&<LoadingSpinner className='mt-0'/>
        }
        <PaginationPanel
          maxBypage={40}
          page={page}
          path="/user/lelosss/games"
          allElements={Number(quantity)}
        />
      </>
    );
}
