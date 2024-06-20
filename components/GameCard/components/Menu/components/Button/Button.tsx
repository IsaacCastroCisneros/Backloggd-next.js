"use client"

import HoverMsg from '@/components/HoverMsg'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React, { ButtonHTMLAttributes, useContext, useState } from 'react'
import Menu from './components/Menu/Menu'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { gameCard } from '@/components/GameCard/GameCard'

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
   icon:IconProp
   label:string
   isMenu?:boolean
   isActive:boolean
}

export default function Button({icon,label,isMenu=false,isActive,...props}:props)
{
  const{isMenuSmall}=useContext(gameCard)
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
      <FontAwesomeIcon size={isMenuSmall ? "xs":undefined} icon={icon} />
    </button>
  );
}
