"use client"

import React, { FormHTMLAttributes, ReactNode,FormEvent,useState} from 'react'
import Button from '@/components/Button';

interface props extends FormHTMLAttributes<HTMLFormElement> 
{
  title: string
  label: string
  children: ReactNode
  submit:()=>void
  isOk?:boolean
  isLoading:boolean
}

async function submittingForm(e:FormEvent<HTMLFormElement>,submit:()=>void)
{
  e.preventDefault();
  submit()
}

export default function Form(myProps:props) 
{
  const{title,label,children,submit,isOk=false,isLoading=false,...props}=myProps


  return (
    <div className="max-w-[100%] w-[538px] mx-auto">
      <h1 className="text-[3rem] text-text block mb-[1rem]">{title}</h1>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={(e) => submittingForm(e,submit)}
        {...props}
      >
        {children}
        <Button isLoading={isLoading} className={`${isOk ? "":"brightness-[50%] pointer-events-none"}`} >{label}</Button>
      </form>
    </div>
  );
}
