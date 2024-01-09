import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {HtmlHTMLAttributes} from 'react'
import Button from '../Button'
import { twMerge } from 'tailwind-merge'

interface props extends HtmlHTMLAttributes<HTMLElement>
{
    handleDiscarding:()=>void
    hanldeReturningToEdit:()=>void
    handleSaving:()=>void
}

export default function Advice(props:props) 
{

  const{hanldeReturningToEdit,handleDiscarding,handleSaving,className,...myProps}=props

  return (
    <div
      {...myProps}
      className={twMerge("bg-border2 p-[1rem] rounded-[.3rem] w-[383px] max-w-[100%]",className)} 
    >
      <span className="text-[#fff] flex items-center text-[20px] gap-[.4rem]">
        <FontAwesomeIcon icon={faWarning} />
        <span className="font-bold">Warning</span>
      </span>
      <span className=" text-text4 font-bold mt-[.3rem] mb-[.8rem] block">
        Your logs have unsaved changes.
      </span>
      <div className="flex w-full justify-between">
        <Button myType="cancel" className=" inline-block" onClick={handleDiscarding}>
          Discard
        </Button>
        <div className="flex gap-[.8rem]">
          <Button myType="cancel" onClick={hanldeReturningToEdit}>
            Return to Edit
          </Button>
          <Button className="bg-myPink" onClick={handleSaving}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
