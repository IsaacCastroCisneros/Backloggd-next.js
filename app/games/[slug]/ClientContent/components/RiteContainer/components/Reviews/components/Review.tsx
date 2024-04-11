import review from '@/app/games/[slug]/interfaces/review'
import { StaticScore } from '@/components/StaticScore/StaticScore'
import StatusLabel from '@/components/StatusLabel/StatusLabel'
import Link from 'next/link'
import React from 'react'

interface props extends review
{

}

export default function Review(props:review) 
{
  const{score,username,status,platform}=props

  return (
    <div className="flex flex-col">
      <Link
        className="text-[1.1rem] text-text2 hover:text-[#fff] font-medium"
        href={`/user/${username}`}
      >
        {username}{" "}
      </Link>
      <div className='flex gap-[.8rem] text-text'>
        <StaticScore score={score} />
        <StatusLabel status={status} platform={platform} />
      </div>
    </div>
  );
}
