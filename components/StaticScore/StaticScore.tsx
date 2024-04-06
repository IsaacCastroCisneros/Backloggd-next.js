import React from 'react'
import { StaticStar } from './components/StaticStar'
import score from '../Score/types/score'

interface props
{
 score:score
}

export const StaticScore = ({score}:props) => 
{
  return (
    <div className='flex text-gray w-fit justify-center relative items-center'>
        <StaticStar myScore={[0,1]}  highligth={score}/>
        <StaticStar myScore={[2,3]}  highligth={score}/>
        <StaticStar myScore={[4,5]}  highligth={score}/>
        <StaticStar myScore={[6,7]}  highligth={score}/>
        <StaticStar myScore={[8,9]}  highligth={score}/>
    </div>
  )
}
