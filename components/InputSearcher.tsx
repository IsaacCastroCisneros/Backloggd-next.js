import { IconDefinition, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { InputHTMLAttributes } from 'react'

interface props extends InputHTMLAttributes<HTMLInputElement>
{
   icon:FontAwesomeIconProps
}

export default function InputSearcher({icon,...props}:props) 
{

  return (
    <div className="flex items-stretch bg-field rounded-[.3rem]">
      <input
        type="text"
        {...props}
        className="placeholder:text-text5 bg-[transparent] outline-none p-[5px] text-[#fff] flex-[1]"
        placeholder="Search"
      />
      <button className="text-text2 hover:text-[#fff] font-bold pl-[4px] pr-[8px]">
        <FontAwesomeIcon {...icon} icon={icon.icon||faMagnifyingGlass} />
      </button>
    </div>
  );
}
