"use client"

import HoverMsg from '@/components/HoverMsg/HoverMsg'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface props extends FontAwesomeIconProps
{
   label:string
}

export default function Button({icon,label}:props)
{
  const[hover,setHover]=useState<boolean>(false)
    
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-[1.1rem] text-gray3 relative"
    >
      <HoverMsg show={hover} label={label} />
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
