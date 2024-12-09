"use client"

import React, { useContext } from 'react'
import { context } from '../../ClientContent'
import { faGamepad, faList, faPlay } from '@fortawesome/free-solid-svg-icons'
import StatisticItem from './components/StatisticItem'
import LogAndScore from '../LogAndScore/LogAndScore'


export default function LeftContainer() 
{
  const{gameDbData}=useContext(context)
  const{playing,plays}=gameDbData


  return (
    <div className="w-[198px] flex flex-col gap-[1rem] mob:hidden">
      <LogAndScore className="pt-[2.5rem] mt-[4rem]"/>
      <div className="rounded-[.3rem] p-[.8rem] bg-border2">
        <ul className="flex flex-col">
          <StatisticItem label="plays" num={plays} icon={faGamepad} />
          <StatisticItem label="Playing" num={playing} icon={faPlay} />
        </ul>
      </div>
    </div>
  );
}
