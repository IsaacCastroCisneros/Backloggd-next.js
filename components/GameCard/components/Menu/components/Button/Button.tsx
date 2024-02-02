"use client"

import HoverMsg from '@/components/HoverMsg/HoverMsg'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Menu from './components/Menu/Menu'

interface props extends FontAwesomeIconProps
{
   label:string
   isMenu?:boolean
}

export default function Button({icon,label,isMenu=false}:props)
{
  const[hover,setHover]=useState<boolean>(false)
    
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-[1.1rem] text-gray3 relative"
    >
      {!isMenu && <HoverMsg show={hover} label={label} />}
      {isMenu && <Menu show={hover} /> }
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
