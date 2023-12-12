import React, { ReactNode } from 'react'

export default function Error({children}:{children:ReactNode}) {
  return (
    <strong className='text-text text-[2rem] block text-center mt-[4rem] px-[1rem]'>
        {
            children
        }
    </strong>
  )
}
