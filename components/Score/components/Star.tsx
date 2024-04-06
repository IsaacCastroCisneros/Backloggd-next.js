"use client"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, SetStateAction,useEffect,useState } from 'react'
import score from '@/components/Score/types/score'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import size from '../types/size'
import { HalfStar } from '@/components/HalfStar/HalfStar'
import { StarContainer } from '@/components/StarContainer/StarContainer'

interface props
{
  score:score
  setScore:Dispatch<SetStateAction<score>>
  myScore:Array<score>
  size?:size
  highligth:score
  setHighligth:Dispatch<SetStateAction<score>>
}

export default function Star(props:props) 
{
  const
  {
    setScore,
    myScore,
    score,
    size="normal",
    highligth,
    setHighligth
  }=props

  const sizes=
  {
    big:{w:"27px",iconSize:"xl"},
    bigger:{w:"36px",iconSize:"2xl"},
    normal:{w:"18px",iconSize:undefined},
    small:{w:"16px",iconSize:"sm"}
  }

  const{w,iconSize}=sizes[size]

  function markingScore(myScore:score):string
  {
    if(score >= myScore)
    {
      if(myScore <=highligth)return "text-myPink2"
      return "text-myPink"
    }
    if(highligth>=myScore)return "text-myPink"
    return ""
  }

  return (
    <StarContainer width={w}>
      <HalfStar
        width={w}
        side="left"
        iconSize={iconSize as SizeProp}
        className={`${markingScore(myScore[0])}`}
        onMouseEnter={() => setScore(myScore[0])}
        onClick={() => setHighligth(myScore[0])}
        onMouseLeave={() => setScore(0)}
      />
      <HalfStar
        width={w}
        side="rite"
        iconSize={iconSize as SizeProp}
        className={`${markingScore(myScore[1])}`}
        onMouseEnter={() => setScore(myScore[1])}
        onClick={() => setHighligth(myScore[1])}
        onMouseLeave={() => setScore(0)}
      />
    </StarContainer>
  );
}
