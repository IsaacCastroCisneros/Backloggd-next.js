"use client"
import React from 'react'
import Link from 'next/link'
import gameCardData from '../../../../../interfaces/gameCardData'
import Card from './components/Card'
import {useSession} from "next-auth/react"
import user from '@/interfaces/user'

interface props
{
    results:Array<gameCardData>
    offset:number
    game:string
}

export default function Results({results,offset,game}:props)  
{
  const {data}=useSession()
  const {user}=data||{user:null}

  return (
    <>
      <div className="flex flex-col gap-[1.8rem]">
        {results.map((card) => (
          <Card key={card.id} {...card} user={user as user|null} />
        ))}
        {results.length < 25 && (
          <span className="font-bold">There is results no more</span>
        )}
      </div>
      {offset > 0 && (
        <Link href={`/games/search?game=${game}&offset=${Number(offset) - 25}`}>
          prev
        </Link>
      )}
      {results.length === 25 && (
        <Link
          href={`/games/search?game=${game}&offset=${Number(offset) + 25}`}
          className="bg-[#fff]"
        >
          next
        </Link>
      )}
    </>
  );
}
