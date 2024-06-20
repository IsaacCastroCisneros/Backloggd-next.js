import Advice from '@/components/Advice'
import React, { Dispatch, SetStateAction } from 'react'

interface props
{
    setShowAdvice:Dispatch<SetStateAction<boolean>>
    clossingPopup:()=>void
    loginTheGame:()=>void
}

export default function CancelingLog({setShowAdvice,clossingPopup,loginTheGame}:props) 
{

  function discarding()
  {
    clossingPopup()
  }
  function returningToEdit()
  {
    setShowAdvice(false)
  }



  return (
    <div className="w-full h-full absolute left-0 top-0 z-[999]">
      <div className="w-full h-full absolute left-0 top-0 bg-[#000] opacity-[.8] z-[99]"></div>
      <Advice
        className="z-[999] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
        hanldeReturningToEdit={returningToEdit}
        handleSaving={loginTheGame}
        handleDiscarding={discarding}
      />
    </div>
  );
}
