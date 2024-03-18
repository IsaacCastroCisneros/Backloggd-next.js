import React, { ReactNode } from 'react'

interface props
{
  children:ReactNode
  title:string
}


export default function Block({children,title}:props) {
  return (
    <div>
      <span className="text-text text-[14.4px] block mb-[.2rem]">{title}</span>
      <div className="flex flex-wrap items-start w-[calc(298px_-_30px)] gap-[.5rem]">
        {children}
      </div>
    </div>
  );
}
