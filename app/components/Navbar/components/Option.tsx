import Link, { LinkProps } from 'next/link'
import React from 'react'

interface props extends LinkProps
{
   children:string

}

export default function Option({children,...props}:props) 
{
  return (
    <li className=' list-none'>
      <Link className="text-text2 text-[14px] hover:text-[#fff] font-medium" {...props}>
        {children   }
      </Link>
    </li>
  );
}
