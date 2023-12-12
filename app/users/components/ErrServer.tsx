import React from 'react'

interface props
{
    errors:Array<string>
}

export default function ErrServer({errors}:props) {
  return (
    (
        <div className="bg-[#f8d7da] px-[1rem] py-[.6rem] text-[#721c24]">
          <div className='w-[1920px] mx-auto max-w-[100%]'>
          <span className="font-bold text-[1.5rem]">Something went wrong</span>
          <ul className='flex flex-col'>
            {errors.map((err, pos) => (
              <li key={pos}>* {err}</li>
            ))}
          </ul>
          </div>
        </div>
      )
  )
}
