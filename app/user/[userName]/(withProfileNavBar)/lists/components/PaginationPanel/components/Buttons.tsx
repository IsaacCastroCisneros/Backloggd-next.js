import React from 'react'
import PageButton from './PageButton'


interface props {
    page: number;
    userName: string;
    pages: number;
  }


export default function Buttons({userName,pages,page}:props) 
{

    let arr = []

    for(let i=0;i<pages;i++)
    {
      arr=[...arr,(i+1)]
    }

    return (
      <>
        {
          arr.map((currentPage,key)=>
            (
              <PageButton key={key} num={currentPage} userName={userName} className={currentPage===page ? "bg-gray3":""} />
            ))
        }
      </>
    )
}
