import React from 'react'
import { StaticStar } from './components/StaticStar'
import score from '../../types/score'

interface props
{
 score:score
}

export const StaticScore = ({score}:props) => 
{
  return (
    <div className='flex text-gray w-fit justify-center relative items-center'>
        <StaticStar myScore={[1,2]}  highligth={score}/>
        <StaticStar myScore={[3,4]}  highligth={score}/>
        <StaticStar myScore={[5,6]}  highligth={score}/>
        <StaticStar myScore={[7,8]}  highligth={score}/>
        <StaticStar myScore={[9,10]}  highligth={score}/>
    </div>
  )
}
