"use client"

import React from 'react'
import PageButton from './components/PageButton'
import Side from './components/Side'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'


interface props
{
  allElements:number
  maxBypage:number
  page:number
  path:string
  customPath?:string
}

export default function PaginationPanel(myProps:props) 
{
  const{allElements,page,path,maxBypage}=myProps

  const pages = Math.ceil(allElements/maxBypage)

  if(pages<1)return null

  return (
    <div className="flex w-full justify-center relative mt-[3.5rem]">
      {page > 1 && (
        <Link
          href={`${path}page=${page - 1}`}
          className="text-text2 absolute left-0"
        >
          <FontAwesomeIcon icon={faChevronLeft} /> <span className='mob:hidden'>Prev</span> 
        </Link>
      )}
      <div className="flex gap-[.5rem] mob:gap-[.2rem]">
        {
          <>
            <PageButton num={1} path={path} className={page===1?"bg-gray3":""} />
            {page >= 5 && <span className="px-[1.5rem] mob:px-[0px] text-text2">...</span>}
            <Side page={page} path={path} side="left" pages={pages} />
            {page !== 1 && (
              <PageButton num={page} className="bg-gray3" path={path} />
            )}
            <Side page={page} path={path} side="rite" pages={pages} />
          </>
        }
        {page !== pages && (
          <>
            {page < pages - 3 && (
              <span className="px-[1.5rem] text-text2 mob:px-[0px]">...</span>
            )}
            <PageButton num={pages} path={path} />
          </>
        )}
      </div>
      {page < pages && (
        <Link
          href={`${path}page=${page + 1}`}
          className="text-text2 absolute right-0"
        >
          <span className='mob:hidden'>
          Next
          </span>
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      )}
    </div>
  );
}

