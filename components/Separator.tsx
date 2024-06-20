import React, { HtmlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends HtmlHTMLAttributes<HTMLElement>
{

}

export default function Separator({className,...props}:props) 
{
  return (
    <span {...props} className={twMerge("border-b-[1px] text-[#323644] block",className)}></span>
  )
}
