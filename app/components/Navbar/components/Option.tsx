import Link, { LinkProps } from 'next/link'
import React, { HtmlHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends LinkProps
{
   children:ReactNode
   className?:string
}

export default function Option({children,className="",...props}:props) 
{
  return (
    <li className=' list-none'>
      <Link {...props} className={twMerge("text-text2 text-[14px] hover:text-[#fff] font-medium",className)}>
        {children}
      </Link>
    </li>
  );
}
