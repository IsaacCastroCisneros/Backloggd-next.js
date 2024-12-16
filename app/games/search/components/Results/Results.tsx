"use client"
import React from 'react'
import gameCardData from '../../../../../interfaces/gameCardData'
import Card from './components/Card'
import NavigationButton from './components/NavigationButton'
import useMyUseSession from '@/hooks/useMyUseSession'
import { useQuery } from 'react-query'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import LoadSpinner from '@/app/components/LoadSpinner'
import LoadingSpinner from '@/components/LoadingSpinner'

interface props
{
    offset:number
    game:string
}

export default function Results(props:props)  
{
  const{offset=0,game}=props
  const user = useMyUseSession()
  const{data:results,isFetching}=useQuery(["searchResults",props],request,{refetchOnWindowFocus:false})

   async function request({queryKey}:any)
    {
        const[_key,props]=queryKey
        const{game,offset}=props
        
        return await getFullGameIGDB({game,offset:`${offset}`}) 
    }

  return (
    <>
      {isFetching &&!results&& <LoadingSpinner />}
      {results && (
        <>
          <div className="flex flex-col gap-[1.8rem] pt-[5rem] mb-[2rem]">
            {results.map((card) => (
              <Card key={card.id} {...card} user={user} />
            ))}
          </div>
          <div className="flex justify-between items-center">
            {offset > 0 && (
              <NavigationButton game={game} offset={offset} type="prev" />
            )}
            {results.length === 25 && (
              <NavigationButton
                game={game}
                offset={offset}
                type="next"
                className="ml-auto"
              />
            )}
          </div>
          {results.length < 25 && (
            <span className="font-bold block w-full text-center text-text2 text-[2rem]">
              There are no more results
            </span>
          )}
        </>
      )}
    </>
  );
}
