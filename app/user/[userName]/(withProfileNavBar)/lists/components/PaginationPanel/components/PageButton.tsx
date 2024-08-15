import Link from 'next/link'
import React from 'react'

interface props
{
    num:number
    userName:string
}

export default function PageButton({num,userName}:props) 
{
  return (
    <Link href={`/user/${userName}/lists?page=${num}`} className='bg-text4 text-text5'>{num}</Link>
  )
}
