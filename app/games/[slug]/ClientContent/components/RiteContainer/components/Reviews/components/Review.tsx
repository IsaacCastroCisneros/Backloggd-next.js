import review from '@/app/games/[slug]/interfaces/review'
import Score from '@/components/Score/Score'
import Link from 'next/link'
import React from 'react'

interface props extends review
{

}

export default function Review(props:review) 
{
  const{score,username}=props

  return (
    <div>
       <Link className='text-[1.1rem] text-text2 hover:text-[#fff] font-medium' href={`/user/${username}`}>{username} </Link>
    </div>
  )
}
