"use client"
import Link, { LinkProps } from 'next/link'
import React, { useState } from 'react'


interface props extends LinkProps
{
    label:string
    isActive:boolean
}

export default function Option(props:props) 
{
  const{href,label,isActive}=props
  const[show,setShow]=useState(false)

  return (
    <li className="text-text6 text-[16px] capitalize font-medium px-[1rem] mob:text-mobText">
      <Link
        href={href}
        className="relative hover:text-[#fff] block h-full"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {label}
        {(show||isActive) && (
          <div className="w-full absolute left-0 bottom-0 translate-y-[100%] flex justify-center">
            <span className={`${isActive ? "bg-myPink":" bg-gray3"} h-[3px] block w-[80%]`}></span>
          </div>
        )}
      </Link>
    </li>
  );
}
