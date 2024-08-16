import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface props
{
    num:number
    userName:string
    className?:string
}

export default function PageButton({num,userName,className="",...props}:props) 
{
  return (
    <Link
      {...props}
      href={`/user/${userName}/lists?page=${num}`}
      className={twMerge(
        "text-[16px] font-semibold bg-field text-text2 w-[30px] h-[30px] flex justify-center items-center rounded-[.3rem] hover:bg-gray3",
        className
      )}
    >
      {num}
    </Link>
  );
}
