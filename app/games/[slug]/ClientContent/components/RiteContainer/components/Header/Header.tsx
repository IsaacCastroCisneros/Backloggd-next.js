"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { context } from '../../../../ClientContent'
import PlatformGenres from './components/PlatformGenres'

export default function Header() 
{
  const{gameFinalData}=useContext(context)
  const{name,date,developer,publisher,summary}=gameFinalData
  const ref = useRef(null)
  const[showButton,setShowButton]=useState<boolean>(false)
  const[show,setShow]=useState<boolean>(false)

  useEffect(()=>
  {
    if(ref.current===null)return
    const h = (ref.current as HTMLElement).offsetHeight
    if(h>120)setShowButton(true)
  },[])

  const toggleShowHandle=()=>
  {
    setShow(prev=>!prev)
  }

  console.log(developer)

  return (
    <div className="mt-[21rem] flex flex-col">
      <section>
        <h1 className="text-[2.5rem] text-[#fff] font-medium">{name}</h1>
        <p className="text-text7 text-[20px] block mb-[.8rem]">
          released on <span className="font-medium text-text2">{date}</span> by{" "}
          <span className="font-medium text-text2">{developer}</span>,{" "}
          <span className="font-medium text-text2">{publisher}</span>
        </p>
      </section>
      <section className='flex gap-[1.4rem] items-start'>
        <div className='flex-1'>
          <p
            className={`text-text4 ${
              showButton && !show ? "line-clamp-5" : ""
            }`}
            ref={ref}
          >
            {summary}
          </p>
          {showButton && (
            <div className="flex items-center gap-[1rem]">
              <span className="border-b-[1px] text-[#323644] flex-1"></span>
              <button
                className="text-text3 hover:text-[#fff] font-medium"
                onClick={toggleShowHandle}
              >
                {show ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
        <PlatformGenres />
      </section>
    </div>
  );
}

