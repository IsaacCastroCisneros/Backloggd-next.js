import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends LinkProps,Omit<AnchorHTMLAttributes<HTMLAnchorElement>,"href"> 
{
   children:ReactNode
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
