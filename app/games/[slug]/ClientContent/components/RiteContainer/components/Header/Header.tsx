"use client"

import React, { useContext } from 'react'
import { context } from '../../../../ClientContent'
import PlatformGenres from './components/PlatformGenres'
import useTextToggle from '@/hooks/useTextToggle'
import { twMerge } from 'tailwind-merge'
import HeaderInformation from '../../../HeaderInformation/HeaderInformation'

export default function Header() 
{
  const{gameFinalData}=useContext(context)
  const{name,date,developer,publisher,summary}=gameFinalData

  const{ref,toggleShowHandle,lineClamp,showButton,buttonLabel}=useTextToggle({height:120}) 

  return (
    <div className="flex flex-col mob:mb-[3rem]">
      <section className="mob:hidden">
        <HeaderInformation
          name={name}
          publisher={publisher}
          date={date}
          developer={developer}
        />
      </section>
      <section className="flex gap-[1.4rem] items-start mob:flex-col mob:gap-0">
        <div className="flex-1 mob:mb-[.8rem]">
          <p className={twMerge("text-text4", lineClamp)} ref={ref}>
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

