import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, FormEvent, HTMLAttributes, InputHTMLAttributes, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

interface props
{
    submittingForm:(e:FormEvent<HTMLFormElement>)=>void
    params:string
    setParams:Dispatch<SetStateAction<string>>
    props?:{input?:InputHTMLAttributes<HTMLInputElement>,div?:HTMLAttributes<HTMLElement>}
}

export default function Searcher(myProps:props) 
{
  const{submittingForm,params,setParams,props}=myProps
  const{input={className:""},div={className:""}}=props || {input:{},div:{}}

  return (
    <form onSubmit={submittingForm}>
      <div
        {...div}
        className={twMerge(
          "bg-field w-fit py-[.2rem] px-[.3rem] border-[1px] border-border rounded-[.2rem]",
          div.className
        )}
      >
        <input
          {...input}
          className={twMerge(
            "bg-[transparent] outline-none text-[#fff]",
            input.className
          )}
          value={params}
          name="search"
          type="text"
          onChange={(e) => setParams(e.target.value)}
        />
        <button className="text-text6 hover:text-[#fff]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </form>
  );
}
