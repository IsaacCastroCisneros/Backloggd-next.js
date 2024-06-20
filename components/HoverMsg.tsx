import React from 'react'

interface props
{
  label:string
  show:boolean
}


export default function HoverMsg({label,show}:props) 
{
  return (
    <span
      className={`px-[.4rem] border-border pointer-events-none rounded-[4px] bg-gray text-[#fff] absolute left-[50%] translate-x-[-50%] duration-200 border-[1px] text-[14px] ${
        show ? "opacity-1 top-[-1.3rem]" : "opacity-0 top-[-.8rem]"
      }`}
    >
      {label}
    </span>
  );
}
