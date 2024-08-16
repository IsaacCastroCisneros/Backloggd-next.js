import React from 'react'
import PageButton from './PageButton';

interface props {
    page: number;
    side: "left" | "rite";
    userName: string;
  }

export default function Side({page,side,userName}:props)
{

   const myPages =
     side === "rite"
       ? { arr: [page + 1, page + 2, page + 3], direction: "flex-row" }
       : { arr: [page - 1, page - 2, page - 3], direction: "flex-row-reverse" }; 

   const finalPages = myPages.arr.filter((page) => page > 1);

   return (
     <>
       {
        finalPages.length>0&&
         <div className={`flex ${myPages.direction} gap-[.5rem]`}>
           {finalPages.map((page, key) => (
             <PageButton key={key} num={page} userName={userName} />
           ))}
         </div>
       }
     </>
   );
}
