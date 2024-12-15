import React from 'react'

interface props
{
  count:number
  label:string
}

export default function BigCount({count=0,label}:props) 
{
    const formattedNumber = count<999 ? count.toString().padStart(3, '0'):999

  return (
    <div className='flex flex-col justify-center w-full items-center'>
        <span className='text-[4.5rem] text-[#fff] font-medium mob:text-[2rem]'>
            {
                formattedNumber
            }
        </span>
        <span className='text-text4 mob:text-[.7rem]'>
            {
                label
            }
        </span>
    </div>
  )
}
