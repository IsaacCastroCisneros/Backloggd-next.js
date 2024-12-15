import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface props 
{
    game:string
    offset:number
    type:"next"|"prev"
    className?:string
}


export default function NavigationButton({game,offset,type,className}:props) 
{

  const typeOptions=
  {
    next:{offset:Number(offset) + 25,label:"next",icon:faChevronRight,style:""},  
    prev:{offset:Number(offset) - 25,label:"prev",icon:faChevronLeft,style:"flex-row-reverse"},  
  }

  const options = typeOptions[type]

  return (
    <Link
      href={`/games/search?game=${game}&offset=${options.offset}`}
      className={twMerge(`text-text2 font-medium capitalize items-center gap-[.5rem] hover:text-[#fff] flex ${options.style}`,className)} 
    >
      {
        options.label
      }
      <FontAwesomeIcon icon={options.icon} />
    </Link>
  );
}
