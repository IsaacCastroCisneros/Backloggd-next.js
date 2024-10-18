import { StaticScore } from '@/components/StaticScore/StaticScore';
import Link from 'next/link';
import React from 'react'
import review from '../interfaces/review';
import StatusLabel from '@/components/StatusLabel';
import Separator from '@/components/Separator';



export default function Review(props:review) 
{
  const{name,releaseDate,username,slug,score,status,platform,review}=props

  return (
    <div className='mt-[1rem]'>
      <div className="flex items-end gap-[1rem] mb-[1rem]">
        <Link href={`/games/${slug}`} title={name} className='text-[1.75rem] text-[#fff] hover:text-text font-medium leading-[2.1rem] whitespace-nowrap overflow-hidden text-ellipsis'>
          <h3
          >
            {name}
          </h3>
        </Link>
        <span className=" font-medium text-text">{releaseDate}</span>
      </div>
      <Link
        href={`/user/${username}/`}
        className="text-[1.1rem] text-text2 font-medium hover:text-[#fff]"
      >
        {username}
      </Link>
      <div className='flex gap-[.8rem] mb-[.6rem]'>
        <StaticScore score={score} />
        <StatusLabel status={status} platform={platform} />
      </div>
      <p className='text-text8'>
        {
          review
        }
      </p>
      <Separator className='mt-[.8rem]'/>
    </div>
  );
}
