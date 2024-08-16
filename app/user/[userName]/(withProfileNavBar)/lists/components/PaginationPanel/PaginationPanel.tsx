"use client"

import React from 'react'
import PageButton from './components/PageButton'
import Side from './components/Side'
import Buttons from './components/Buttons'


interface props
{
  pages:number
  page:number
  userName:string
}

export default function PaginationPanel({userName,pages,page}:props) 
{

  return (
    <div className="flex gap-[.5rem]">
      {pages > 4 ? (
        <>
          <>
            <PageButton num={1} userName={userName} />
            {page >= 6 && <span className="px-[1.5rem] text-text2">...</span>}
          </>
          <Side page={page} userName={userName} side="left" />
          {page !== 1 && (
            <PageButton num={page} userName={userName} className="bg-gray3" />
          )}
          <Side page={page} userName={userName} side="rite" />
        </>
      ) : (
        <Buttons userName={userName} pages={pages} page={page} />
      )}
      {pages > 4 && (
        <>
          <span className="px-[1.5rem] text-text2">...</span>
          <PageButton num={pages} userName={userName} />
        </>
      )}
    </div>
  );
}

