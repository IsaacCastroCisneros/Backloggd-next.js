import React, { HtmlHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends HtmlHTMLAttributes<HTMLElement>
{
   width:string
   children:ReactNode
}

export const StarContainer = ({width,children,className,...props}:props) => {
  return (
    <div
      className={twMerge(`text-gray3 flex justify-between items-center`,className) }
      style={{width}}
    >
     {
       children
     }
    </div>
  )
}
