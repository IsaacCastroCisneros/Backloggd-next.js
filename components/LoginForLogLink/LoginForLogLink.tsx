import React from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface props
{
  className?:string
}

export default function LoginForLogLink({className=""}:props) 
{
  return (
    <Link
      href="/users/login"
      className={twMerge("font-medium text-center text-[#fff] px-[.7rem] py-[.3rem] block rounded-[.2rem] duration-200 absolute left-[50%] translate-x-[-50%] whitespace-nowrap bottom-[.4rem] hover:brightness-[150%] bg-myPink",className)} 
    >
      Login for log
    </Link>
  );
}
