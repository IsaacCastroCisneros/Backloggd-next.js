"use client"

import { StaticScore } from '@/components/StaticScore/StaticScore';
import Link from 'next/link';
import React from 'react'
import review from '../interfaces/review';
import StatusLabel from '@/components/StatusLabel';
import Separator from '@/components/Separator';
import useTextToggle from '@/hooks/useTextToggle';



export default function Review(props:review) 
{
  const{name,date:releaseDate,username,slug,score,status,platform,review}=props

  const {ref,showButton,toggleShowHandle,buttonLabel,lineClamp} = useTextToggle({height:96})

  return (
    <div className="mt-[1rem]">
      <div className="flex items-end gap-[1rem] mb-[1rem]">
        <Link
          href={`/games/${slug}`}
          title={name}
          className="text-[1.75rem] text-[#fff] hover:text-text font-medium leading-[2.1rem] overflow-hidden"
        >
          <h3 className="whitespace-nowrap text-ellipsis overflow-hidden">
            {name}
          </h3>
        </Link>
        <span className=" font-medium text-text">{releaseDate||"TBD"}</span>
      </div>
      <Link
        href={`/user/${username}/`}
        className="text-[1.1rem] text-text2 font-medium hover:text-[#fff]"
      >
        {username}
      </Link>
      <div className="flex gap-[.8rem] mb-[.6rem]">
        <StaticScore score={score} />
        <StatusLabel status={status} platform={platform} />
      </div>
      <p ref={ref} className={`text-text8 ${lineClamp}`}>
        {review}
      </p>
      {showButton && (
        <button
          onClick={toggleShowHandle}
          className="uppercase ml-auto text-text6 font-bold hover:text-[#fff] mt-[.7rem] text-[14.4px]"
        >
          {buttonLabel}
        </button>
      )}
      <Separator className="mt-[.8rem]" />
    </div>
  );
}
