"use client"

import React, { useContext } from 'react'
import { context } from '../../ClientContent'
import CardPic from '@/components/CardPic/CardPic'
import Score from '@/components/Score/Score'
import { useSession } from 'next-auth/react'
import user from '@/interfaces/user'
import Button from '@/components/Button'
import { faGamepad, faList, faPlay } from '@fortawesome/free-solid-svg-icons'
import ButtonLog from './components/ButtonLog'
import useLogButtons from '@/hooks/useLogButtons/useLogButtons'
import StatisticItem from './components/StatisticItem'
import { twMerge } from 'tailwind-merge'



export default function LeftContainer() 
{
  const{gameFinalData,gameDbData}=useContext(context)
  const data = useSession().data
  const user = data ? data.user as user : null 
  const{cover,id}=gameFinalData
  const{playing,plays,listed}=gameDbData

  const {statusUpdate,hightLigth}=useLogButtons({game_id:id,user_id:user?.id||""})

  const container="rounded-[.3rem] p-[.8rem] bg-border2"

  return (
    <div className="w-[198px] flex flex-col gap-[1rem]">
      <div className={twMerge(container,"relative w-full mt-[4rem] flex flex-col items-center pt-[2.5rem]")}>
        <Button className="capitalize w-full mb-[.5rem]">edit your log</Button>
        <CardPic
          className="absolute top-[0] translate-y-[-88%] translate-x-[-50%] left-[50%]"
          src={cover}
          width={165}
          height={223}
        />
        {user && <Score size="bigger" id={`${id}`} user={user} />}
        <p className="border-b-[1px] border-border4 block w-full my-[.6rem]"></p>
        <div className="flex w-full justify-evenly">
          <ButtonLog
            icon={faGamepad}
            label="played"
            isActive={"played" === hightLigth}
            onClick={() => statusUpdate("played")}
          />
          <ButtonLog
            icon={faPlay}
            label="Playing"
            isActive={"playing" === hightLigth}
            onClick={() => statusUpdate("playing")}
          />
        </div>
      </div>
      <div className={container}>
        <ul className="flex flex-col">
          <StatisticItem label="plays" num={plays} icon={faGamepad} />
          <StatisticItem label="Playing" num={playing} icon={faPlay} />
          <StatisticItem label="Lists" num={listed} icon={faList} />
        </ul>
      </div>
    </div>
  );
}
