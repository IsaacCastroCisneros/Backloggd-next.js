import React from 'react'
import PageButton from './PageButton';

interface props {
    page: number;
    side: "left" | "rite";
    path:string
    pages:number
  }

export default function Side({page,side,path,pages}:props)
{

   const myPages =
     side === "rite"
       ? { arr: [page + 1, page + 2, page + 3], direction: "flex-row" }
       : { arr: [page - 1, page - 2, page - 3], direction: "flex-row-reverse" }; 

   const finalPages = myPages.arr.filter((page) => page > 1&&page<pages);

   return (
     <>
       {
        finalPages.length>0&&
         <div className={`flex ${myPages.direction} mob:gap-[.2rem] gap-[.5rem]`}>
           {finalPages.map((page, key) => (
             <PageButton key={key} num={page} path={path} />
           ))}
         </div>
       }
     </>
   );
}
