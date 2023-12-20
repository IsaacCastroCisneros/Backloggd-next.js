import React, { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends TextareaHTMLAttributes<HTMLTextAreaElement>
{
   
}

export default function Textarea({className,...props}:props) {
  return (
    <textarea
      {...props}
      className={twMerge(
        "bg-field text-text2 p-[8px] rounded-[.3rem] resize-none w-full h-[200px] block focus:border-text border-[1px] border-[transparent] outline-none focus:text-[#fff]",
        className
      )}
    ></textarea>
  );
}
