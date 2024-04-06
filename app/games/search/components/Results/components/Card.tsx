"use client"

import React, { useContext } from 'react'
import gameCardData from '../../../../../../interfaces/gameCardData'
import Link from 'next/link'
import Button from '@/components/Button'
import CardPic from '@/components/CardPic/CardPic'
import Score from '@/components/Score/Score'
import user from '@/interfaces/user'
import { global } from '@/app/context/GlobalContext'
import LogForm from '@/components/LogForm/LogForm'
import LoginForLogLink from '@/components/LoginForLogLink/LoginForLogLink'
import { useQuery } from 'react-query'
import getScore from '@/server/getScore'

interface props extends gameCardData
{
 user:user|null
}

const request=async({queryKey}:any)=>
{
  const{gameId,userId}=queryKey[1]
  const {res} = await getScore(gameId,userId)
  if(res.length===0)return 0
  return res[0].score
}

export default function Card(props:props) 
{
  const
  {
    name,
    date,
    cover,
    user,
    slug,
    id
  }=props

  const{setPopup}=useContext(global)
  const{data:initialScore}=useQuery(["score",{gameId:id,userId:user?.id}],request)

  return (
    <div className="flex gap-[1rem] mob1:gap-[.5rem] items-start pb-[.5rem] border-b-[1px] border-border">
      <Link href={`/games/${slug}`}>
        <CardPic
          className="mob1:hidden"
          notFoundStyles="mob1:hidden"
          src={cover}
        />
        <CardPic
          className="mob1:min-h-[85.25px] mob1:min-w-[57.39px] mob1:block hidden"
          height={85.25}
          width={57.39}
          notFoundStyles="mob1:block hidden"
          src={cover}
        />
      </Link>
      <span className="font-medium flex gap-[.5rem] items-start mob1:min-w-[130px] mob1:w-[130px] mob1:flex-col mob1:gap-0">
        <Link
          href={`/games/${slug}`}
          className="text-[#fff] text-[28px] hover:text-text leading-[2rem] pb-[.5rem] mob1:pb-[0rem] line-clamp-2 max-w-[700px] mob:text-[20px] mob1:leading-[normal] mob1:text-[16px]"
        >
          {name}
        </Link>
        <span className="text-text leading-[2rem] block mob1:text-[16px] mob1:leading-[normal]">
          {date || "TBD"}
        </span>
      </span>
      <div className="flex flex-col ml-auto items-center gap-[.5rem]">
        {user &&<Score size="normal" user={user} id={id} initialScore={initialScore} />}
        {user && (
          <Button
            className="whitespace-nowrap"
            onClick={() =>
              setPopup({
                show: true,
                content: <LogForm {...props} initialScore={initialScore} user={user} />,
                clickOutside: false,
              })
            }
          >
            Log or Review
          </Button>
        )}
        {!user && <LoginForLogLink />}
      </div>
    </div>
  );
}
