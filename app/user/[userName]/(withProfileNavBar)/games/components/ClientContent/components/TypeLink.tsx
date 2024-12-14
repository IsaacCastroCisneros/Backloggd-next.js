import React from 'react'
import { twMerge } from 'tailwind-merge'
import typeLink from '../../../interfaces/typeLink'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function TypeSelector({type,userName,currentType}:typeLink) 
{

  const router =useRouter()
  const isSelected = type===currentType
  const selectedStyles="bg-gray text-[#fff]"
  const unselectedStyle="border-border3 border-[1px] text-text2 capitalize hover:text-[#fff] hover:bg-[#292f3c6b]"

  const style= isSelected ? selectedStyles:unselectedStyle

  return (
    <Link href={`/user/${userName}/games?type=${type}`} className={twMerge("py-[2px] px-[6px] text-[.9rem] rounded-[.2rem] mob1:text-[.7rem] capitalize",style)}>
        {type}
    </Link>
  )
}
