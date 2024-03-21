import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface props
{
  icon:IconProp
  label:string
}

export default function ButtonLog({icon,label}:props) 
{
  const[hover,setHover]=useState<boolean>(false)

  const toggleHoverHandle=(bool:boolean)=>setHover(bool)

  return (
    <button className='text-gray3' onMouseEnter={()=>toggleHoverHandle(true)} onMouseLeave={()=>toggleHoverHandle(false)}>
       <FontAwesomeIcon icon={icon} size='2xl'/>
       <p className={`text-[.67rem] capitalize ${hover ? "text-[#fff]":"text-text3"}`}>{label}</p>
    </button>
  )
}
