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

interface props extends gameCardData
{
 user:user|null
}

export default function Card(props:props) 
{
  const
  {
    name,
    date,
    cover,
    user,
    id,
    platforms
  }=props

  const{setPopup}=useContext(global)
 
  return (
    <div className="flex gap-[1rem] mob1:gap-[.5rem] items-start pb-[.5rem] border-b-[1px] border-border">
      <Link href="/">
        <CardPic src={cover} />
      </Link>
      <span className="font-medium flex gap-[.5rem] items-start mob1:min-w-[130px] mob1:w-[130px] mob1:flex-col mob1:gap-0">
        <Link
          href="/"
          className="text-[#fff] text-[28px] hover:text-text leading-[2rem] pb-[.5rem] mob1:pb-[0rem] line-clamp-2 max-w-[700px] mob:text-[20px] mob1:leading-[normal] mob1:text-[16px]"
        >
          {name}
        </Link>
        <span className="text-text leading-[2rem] block mob1:text-[16px] mob1:leading-[normal]">
          {date || "TBD"}
        </span>
      </span>
      <div className="flex flex-col ml-auto">
        {user && <Score size="normal" user={user} id={id} />}
        {user && (
          <Button
            className="whitespace-nowrap"
            onClick={() =>
              setPopup({
                show: true,
                content: <LogForm {...props} user={user} />,
                clickOutside: false,
              })
            }
          >
            Log or Review
          </Button>
        )}
        {
          !user&&
          <Link href="/users/login" className='font-medium text-[#fff] px-[.7rem] py-[.3rem] block rounded-[.2rem] duration-200 relative hover:brightness-[150%] bg-myPink'>
            Login for log
          </Link>
        }
      </div>
    </div>
  );
}
