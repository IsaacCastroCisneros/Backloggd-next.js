import React, { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends InputHTMLAttributes<HTMLInputElement>
{
  underText?:string
  msg?:string
}

export default function Input(myProps:props) 
{
  const{className,type="text",underText,msg,...props}=myProps

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          {...props}
          type={type}
          className={twMerge(
            "bg-field focus:text-[#fff] h-[32px] w-full text-text2 placeholder:text-placeholder rounded-[.2rem] outline-none focus:border-text border-[2px] border-[transparent] duration-200 px-[5px]",
            className
          )}
        />
        {msg && (
          <span className="px-[5px] rounded-[.2rem] absolute text-[#fff] bg-[#f20505] text-[12px] bottom-0 translate-y-[50%] right-0">
            {msg}
          </span>
        )}
      </div>
      <label className="text-text text-[12px]">{underText}</label>
    </div>
  );
}
