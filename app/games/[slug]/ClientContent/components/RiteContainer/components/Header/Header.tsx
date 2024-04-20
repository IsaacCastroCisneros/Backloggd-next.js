"use client"

import React, { useContext } from 'react'
import { context } from '../../../../ClientContent'
import PlatformGenres from './components/PlatformGenres'
import useTextToggle from '@/hooks/useTextToggle'
import { twMerge } from 'tailwind-merge'

export default function Header() 
{
  const{gameFinalData}=useContext(context)
  const{name,date,developer,publisher,summary}=gameFinalData

  const{ref,toggleShowHandle,lineClamp,showButton,buttonLabel}=useTextToggle({height:120}) 

  return (
    <div className="flex flex-col mob:mb-[3rem]">
      <section className='mob:hidden'>
        <h1 className="text-[2.5rem] text-[#fff] font-medium">{name}</h1>
        <p className="text-text7 text-[20px] block mb-[.8rem]">
          released on <span className="font-medium text-text2">{date}</span> by{" "}
          <span className="font-medium text-text2">{developer}</span>,{" "}
          <span className="font-medium text-text2">{publisher}</span>
        </p>
      </section>
      <section className='flex gap-[1.4rem] items-start mob:flex-col mob:gap-0'>
        <div className='flex-1 mob:mb-[.8rem]'>
          <p
            className={twMerge("text-text4",lineClamp)}
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
                {buttonLabel}
              </button>
            </div>
          )}
        </div>
        <PlatformGenres />
      </section>
    </div>
  );
}

