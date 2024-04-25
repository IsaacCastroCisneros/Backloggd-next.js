import review from '@/app/games/[slug]/interfaces/review'
import Separator from '@/components/Separator/Separator'
import { StaticScore } from '@/components/StaticScore/StaticScore'
import StatusLabel from '@/components/StatusLabel/StatusLabel'
import useTextToggle from '@/hooks/useTextToggle'
import Link from 'next/link'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends review
{

}

export default function Review(props:review) 
{
  const{score,username,status,platform,review}=props

  const{ref,toggleShowHandle,lineClamp,showButton,buttonLabel}=useTextToggle({height:120})

  return (
    <>
      <div className="flex flex-col">
        <Link
          className="text-[1.1rem] text-text2 hover:text-[#fff] font-medium"
          href={`/user/${username}`}
        >
          {username}{" "}
        </Link>
        <div className="flex gap-[.8rem] text-text">
          <StaticScore score={score} />
          <StatusLabel status={status} platform={platform} />
        </div>
        <p
          ref={ref}
          className={twMerge(
            "text-text4 text-[14px] mt-[.8rem] whitespace-pre-line max-w-[854px]",
            lineClamp
          )}
          style={{ wordWrap: "break-word" }}
        >
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
      </div>
      <Separator className='my-[.8rem]' />
    </>
  );
}
