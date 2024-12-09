"use client"
import React from 'react'
import gameCardData from '../../../../../interfaces/gameCardData'
import Card from './components/Card'
import {useSession} from "next-auth/react"
import user from '@/interfaces/user'
import NavigationButton from './components/NavigationButton'

interface props
{
    results:Array<gameCardData>
    offset:number
    game:string
}

export default function Results({results,offset,game}:props)  
{
  const {data}=useSession()
  const {user:myUser}=data||{user:null}
  const user = myUser as user|null

  return (
    <>
      <div className="flex flex-col gap-[1.8rem] pt-[5rem] mb-[2rem]">
        {results.map((card) => (
          <Card key={card.id} {...card} user={user} />
        ))}
      </div>
      <div className='flex justify-between items-center'>
        {offset > 0 && (
          <NavigationButton game={game} offset={offset} type="prev" />
        )}
        {results.length === 25 && (
          <NavigationButton game={game} offset={offset} type="next" />
        )}
      </div>
      {results.length < 25 && (
          <span className="font-bold block w-full text-center text-text2 text-[2rem]">There are no more results</span>
        )}
    </>
  );
}
