import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ButtonHTMLAttributes, useState } from 'react'

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
  icon:IconProp
  label:string
  isActive:boolean
}

export default function ButtonLog(props:props) 
{
  const{icon,label,isActive,...myProps}=props
  const[hover,setHover]=useState<boolean>(false)

  const toggleHoverHandle=(bool:boolean)=>setHover(bool)

  return (
    <button
      {...myProps}
      onMouseEnter={() => toggleHoverHandle(true)}
      onMouseLeave={() => toggleHoverHandle(false)}
    >
      <span className={`${isActive ? "text-myPink":"text-gray3"}`}>
        <FontAwesomeIcon icon={icon} size="2xl" />
      </span>
      <p
        className={`text-[.67rem] capitalize ${
          hover ? "text-[#fff]" : "text-text3"
        }`}
      >
        {label}
      </p>
    </button>
  );
}
