import React, { ReactNode, SelectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends SelectHTMLAttributes<HTMLSelectElement>
{
   children:ReactNode
}


export default function Select({children,className,...props}:props) 
{
  return (
    <select
     {...props}
     className={twMerge("bg-field text-text2 text-[16px] mob1:text-[14px] px-[12px] py-[3px] rounded-[.3rem]",className)}
     >
      {
        children
      }
    </select>
  )
}
