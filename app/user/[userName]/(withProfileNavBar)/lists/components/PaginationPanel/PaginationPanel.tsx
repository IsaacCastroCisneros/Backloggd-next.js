"use client"

import React from 'react'
import PageButton from './components/PageButton'


interface props
{
  pages:number
  page:number
  userName:string
}

export default function PaginationPanel({userName,pages,page}:props) 
{

  return (
    <div className='flex gap-[1rem]'>
      <Side page={page} userName={userName} side='left' />
      <PageButton num={page} userName={userName} />
      <Side page={page} userName={userName} side='rite' />
    </div>
  );
}

function Side({page,side,userName}:{page:number,side:"left"|"rite",userName:string})
{
   const pages = side==="rite" ?[(page+1),(page+2),(page+3)]:[(page-1),(page-2),(page-3)]

   return (
    <>
      {
        pages.map((page,key)=>
          (
            <PageButton key={key} num={page} userName={userName} />
          ))
      }
    </>
   )
}