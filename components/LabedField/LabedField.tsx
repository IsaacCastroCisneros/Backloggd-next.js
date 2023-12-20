import React, {HtmlHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import Input from '../Input'
import { twMerge } from 'tailwind-merge';

interface props 
{
  label: string;
  children:ReactNode
  props?: {
    label?: LabelHTMLAttributes<HTMLLabelElement>;
    container?:HtmlHTMLAttributes<HTMLElement>
  };
}

export default function LabedField({label,children,props}:props) 
{
  const{label:labelProps,container}=props || {label:{},textarea:{}}

  return (
    <div className={twMerge('flex flex-col',container?.className)} >
      <label {...labelProps} className={twMerge("text-[#fff] text-[16px] block",labelProps?.className)} >
         {label}
      </label>
      {
        children
      }
    </div>
  )
}
