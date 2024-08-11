import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'
import React, { HtmlHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends HtmlHTMLAttributes<HTMLElement>
{
  coverArr:Array<{url:string}>,
  number:number
}

export default function Cover({coverArr,number,...props}:props) 
{ 
  const isCover= coverArr[number]
  let cover:string = "radial-gradient(#242832 43%, #16181c 121%)"

  if(isCover)
  {
    cover = `url(${choosingImgSize({ url: isCover.url, size: "cover_big" })})` 
  }

  return (
    <div
      {...props}
      className={twMerge("w-[115px] h-[156px] shadow-[2px_0_5px_0_#000000b3] rounded-[.2rem] border-[#30394c] border-[1px]",props.className)} 
      style={{
        backgroundImage: `${cover}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
    
    </div>
  );
}
