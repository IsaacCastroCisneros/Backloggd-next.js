import Button from '@/components/Button'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

  return (
    <div className="w-full h-full absolute left-0 top-0 z-[999]">
      <div className="w-full h-full absolute left-0 top-0 bg-[#000] opacity-[.8] z-[99]"></div>
      <div className="z-[999] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-border2 p-[1rem] rounded-[.3rem] w-[383px] max-w-[100%]">
        <span className="text-[#fff] flex items-center text-[20px] gap-[.4rem]">
          <FontAwesomeIcon icon={faWarning} />
          <span className="font-bold">Warning</span>
        </span>
        <span className=" text-text4 font-bold mt-[.3rem] mb-[.8rem] block">
          Your logs have unsaved changes.
        </span>
        <div className="flex w-full justify-between">
          <Button
            myType="cancel"
            className=" inline-block"
            onClick={discarding}
          >
            Discard
          </Button>
          <div className="flex gap-[.8rem]">
            <Button myType="cancel" onClick={() => setShowAdvice(false)}>
              Return to Edit
            </Button>
            <Button className="bg-myPink" onClick={() => loginTheGame()}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
