import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface props
{
   icon:IconProp
   label:string
   num:number
}

export default function StatisticItem({icon,label,num}:props) 
{
  return (
    <li className="flex text-text hover:text-[#fff] text-[14.4px] w-full">
      <span className="text-myPink w-[1.2rem] flex justify-center items-center mr-[.3rem] font-semibold">
        <FontAwesomeIcon icon={icon} />
      </span>
      <p className='capitalize'>{label}</p>
      <p className='ml-auto'>{num}</p>
    </li>
  );
}
