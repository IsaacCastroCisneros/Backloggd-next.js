import React, { ButtonHTMLAttributes,ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
  children:ReactNode
  isLoading?:boolean
  myType?:"cancel"|"accept"
}

export default function Button(myProps:props) 
{
  const{children,className,isLoading=false,myType="accept",...props}=myProps

  const styleTypeSwitcher=
  {
    cancel:"hover:brightness-[60%] bg-gray3",
    accept:"hover:brightness-[150%] bg-myPink"
  }

  const myHover=styleTypeSwitcher[myType] 

  return (
    <button
      {...props}
      className={twMerge(
        `font-medium text-[#fff] px-[.7rem] py-[.3rem] block rounded-[.2rem] duration-200 relative ${myHover}`,
        className
      )}
    >
      {!isLoading &&children}
      {isLoading&&<>...Loading</>}
    </button>
  );
}
