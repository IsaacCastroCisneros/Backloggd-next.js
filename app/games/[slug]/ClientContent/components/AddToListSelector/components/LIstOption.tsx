import list from '@/interfaces/list'
import React, { useState } from 'react'
import "../style/style.css"
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function LIstOption({name,id}:list) 
{
  const[check,setCheck]=useState<boolean>(false)



  return (
    <li className={`py-[.5rem] flex gap-[1rem] items-center relative list_item hover:bg-field px-[16px] ${check ? "bg-field": ""}`} >
      {
        !check&&<div className="border-[1px] border-gray3 w-[16px] h-[16px] rounded-[100%]"></div>
      }
      {
        check&&
        <FontAwesomeIcon icon={faCheckCircle} className=' text-myPink'/>
      }
      <input type="checkbox" className=' absolute left-0 top-0 w-full h-full opacity-0 hover:cursor-pointer' onClick={()=>setCheck(prev=>!prev)} checked={check} name={id} value={id} />
      <span className={`text-text4 name ${check ? "selected": ""}`}>
        {
            name
        }
      </span>
    </li>
  )
}
