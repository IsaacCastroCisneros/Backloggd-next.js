import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
  label:string
  date:number|undefined
}

export default function InputSearcherOption(myProps:props) 
{
    const{className,date,label,...props}=myProps

  return (
    <button
    className={twMerge(
        `bg-border2 hover:bg-bg w-full px-[.3rem] py-[.2rem] text-text4 text-left border-b-[1px] border-border`,
        className
    )}
    {...props}
    >
      {label}&nbsp;
      {date && `(${date})`}
    </button>
  );
}
