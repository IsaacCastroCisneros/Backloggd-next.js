import React, { LabelHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends LabelHTMLAttributes<HTMLLabelElement>
{
  children:ReactNode
}

export default function Label({children,className,...props}:props) {
  return (
    <label {...props} className={twMerge("text-[16px] block text-[#8f9ca7]",className)} >
      {children}
    </label>
  )
}
