import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface props
{
    num:number
    className?:string
    path:string
}

export default function PageButton(myProps:props) 
{
  const{num,className="",path,...props}=myProps


  return (
    <Link
      {...props}
      href={`${path}?page=${num}`}
      className={twMerge(
        "text-[16px] font-semibold bg-field text-text2 w-[30px] h-[30px] mob:w-[20px] mob:h-[20px] flex justify-center items-center rounded-[.3rem] hover:bg-gray3 mob:text-[11px]",
        className
      )}
    >
      {num}
    </Link>
  );
}
