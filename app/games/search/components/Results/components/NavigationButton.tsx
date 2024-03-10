import React, { ReactNode } from 'react'
import Link from 'next/link'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface props
{
    game:string
    offset:number
    type:"next"|"prev"
}

export default function NavigationButton({game,offset,type}:props) 
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
      className={`text-text2 font-medium capitalize items-center gap-[.5rem] hover:text-[#fff] flex ${options.style}`} 
    >
      {
        options.label
      }
      <FontAwesomeIcon icon={options.icon} />
    </Link>
  );
}
