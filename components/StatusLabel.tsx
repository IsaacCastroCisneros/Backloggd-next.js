import gameStatus from '@/types/gameStatus'
import React, { ReactNode } from 'react'

interface props
{
    status:gameStatus
    platform:string
}


export default function StatusLabel({status,platform}:props) 
{
  const dotSwitcher:{
    [prop in gameStatus]: string 
  }=
  {
    played:"bg-myPink",
    shelved:"bg-myYellow",
    completed:"bg-myGreen",
    abandoned:"bg-myRed",
    retired:"bg-myBlue",
    none:"",
    playing:"bg-myPink",
  }


  return (
    <p className='flex text-text text-[14px] overflow-hidden'>
      <Text>
        <span
          className={`w-[.5rem] h-[.5rem] ${dotSwitcher[status]} block rounded-[100%]`}
        ></span>
        {status}
      </Text>&nbsp;<p className='mob:hidden'>on</p>&nbsp;<Text><span title={platform} className='mob1:hidden'>{platform}</span></Text>
    </p>
  );
}

function Text({children}:{children:ReactNode})
{
    return(
      <span className="text-text2 font-medium capitalize flex items-center gap-[.1rem] whitespace-nowrap overflow-hidden text-ellipsis">
       {
        children
       } 
      </span>
    )
}
