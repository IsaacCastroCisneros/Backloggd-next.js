import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface props
{
    label:string
}

export default function Platform({label}:props) 
{
  return (
    <span className='text-text6 border-text border-[1px] rounded-[.2rem] px-[.3rem] flex items-center gap-[.3rem] hover:text-[#fff] hover:border-text-[#fff] select-none'
     title={label}
     >
        <FontAwesomeIcon icon={faGamepad} />
        <span className='max-w-[231px] overflow-hidden whitespace-nowrap text-ellipsis mob:max-w-[initial]'>
        {
          label
        }
        </span>
    </span>
  )
}
