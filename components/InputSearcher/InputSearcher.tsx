import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { InputHTMLAttributes, useEffect, useRef } from 'react'

interface props extends InputHTMLAttributes<HTMLInputElement>
{
   icon:FontAwesomeIconProps
   focusOnStar?:boolean
}

export default function InputSearcher({icon,focusOnStar=false,...props}:props) 
{
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
    <>
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
    </>
  );
}
