"use client"

import HoverMsg from '@/components/HoverMsg/HoverMsg'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { ButtonHTMLAttributes, useState } from 'react'
import Menu from './components/Menu/Menu'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
   icon:IconProp
   label:string
   isMenu?:boolean
   isActive:boolean
}

export default function Button({icon,label,isMenu=false,isActive,...props}:props)
{
  const[hover,setHover]=useState<boolean>(false)
    
  return (
    <button
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`text-[1.1rem] relative ${isActive ? "text-myPink":"text-gray3"}`} 
    >
      {!isMenu && <HoverMsg show={hover} label={label} />}
      {isMenu && <Menu show={hover} /> }
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
