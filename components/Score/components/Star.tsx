"use client"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, SetStateAction,useEffect,useState } from 'react'
import score from '@/components/Score/types/score'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import size from '../types/size'

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
    big:{w:"27px",icon:"xl"},
    bigger:{w:"36px",icon:"2xl"},
    normal:{w:"18px",icon:undefined},
    small:{w:"16px",icon:"sm"}
  }

  const{w,icon}=sizes[size]

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
    <div
      className={`text-gray3 flex justify-between items-center hover:cursor-pointer`}
      style={{ width: w }}
    >
      <div
        className={`w-[calc(${w}_/_2)] overflow-hidden ${markingScore(myScore[0])}`}
        onMouseEnter={() => setScore(myScore[0])}
        onClick={()=>setHighligth(myScore[0])}
        onMouseLeave={() => setScore(0)}
      >
        <button>
          <FontAwesomeIcon icon={faStar} size={icon as SizeProp | undefined} />
        </button>
      </div>
      <div
        className={`w-[calc(${w}_/_2)] overflow-hidden scale-x-[-1] ${markingScore(myScore[1])}`}
        onMouseEnter={() => setScore(myScore[1])}
        onClick={()=>setHighligth(myScore[1])}
        onMouseLeave={() => setScore(0)}
      >
        <button>
          <FontAwesomeIcon icon={faStar} size={icon as SizeProp | undefined} />
        </button>
      </div>
    </div>
  );
}
