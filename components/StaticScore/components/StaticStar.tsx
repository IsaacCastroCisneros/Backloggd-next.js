import { HalfStar } from '@/components/HalfStar/HalfStar'
import score from '@/components/Score/types/score'
import { StarContainer } from '@/components/StarContainer/StarContainer'
import React from 'react'

interface props
{
  myScore:Array<score>
  highligth:score
}

export const StaticStar = ({myScore,highligth}:props) => 
{
  const makingScore=(score:score)=>
  {
    if(highligth>=score)return "text-myPink"
    return ""
  }

  return (
    <StarContainer width='16px' className=' pointer-events-none'>
        <HalfStar side='left' width='16px' iconSize='sm' className={`${makingScore(myScore[0])}`} />
        <HalfStar side='rite' width='16px' iconSize='sm' className={`${makingScore(myScore[1])}`} />
    </StarContainer>
  )
}
