import list from '@/interfaces/list'
import React from 'react'

export default function LIstOption({name,id}:list) 
{

  return (
    <li className='py-[.5rem] flex gap-[1rem] items-center relative'>
      <input type="checkbox" className=' absolute left-0 top-0 w-full h-full' name={name} value={id} />
      <span className='text-text4'>
        {
            name
        }
      </span>
    </li>
  )
}
