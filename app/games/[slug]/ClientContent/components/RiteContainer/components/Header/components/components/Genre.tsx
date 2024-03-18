import React from 'react'

interface props
{
    label:string
}

export default function Genre({label}:props) 
{
  return (
    <span className='text-[11px] text-text2 border-text border-[1px] rounded-[.2rem] px-[.2rem]'>
      {
        label
      }
    </span>
  )
}
