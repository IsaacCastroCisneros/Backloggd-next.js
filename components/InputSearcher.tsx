"use client"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { InputHTMLAttributes,ReactNode,useEffect, useRef } from 'react'

  interface props extends InputHTMLAttributes<HTMLInputElement>
  {
    icon:FontAwesomeIconProps
    focusOnStar?:boolean
    status:boolean|"isLoading"
    children:ReactNode
  }

export default function InputSearcher(myProps:props) 
{
  const{icon,focusOnStar=false,status,children,...props}=myProps
  const input = useRef<HTMLInputElement|null>(null)

  useEffect(()=>
  {
    if(focusOnStar)
    {
      const myInput=input.current
      if(myInput)
      {
        myInput.focus()
      }
    }

  },[])


  return (
    <div className='relative'>
      <div className="flex items-stretch bg-field rounded-[.3rem]">
        <input
          type="text"
          ref={input}
          {...props}
          className="placeholder:text-text5 bg-[transparent] outline-none p-[5px] text-[#fff] flex-[1]"
          placeholder="Search"
        />
        <button className="text-text2 hover:text-[#fff] font-bold pl-[4px] pr-[8px]">
          <FontAwesomeIcon {...icon} icon={icon.icon || faMagnifyingGlass} />
        </button>
      </div>
      <div
        className={`flex-col absolute top-[100%] left-0 max-h-[25rem] overflow-y-auto w-full rounded-[0px_0px_.3rem_.3rem] z-[999] ${
          status === true ? "flex" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
