import React, {HtmlHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes } from 'react'
import Input from './Input'
import { twMerge } from 'tailwind-merge';
import LabedField from './LabedField';

interface props
{
  label: string;
  props?: {
    label?: LabelHTMLAttributes<HTMLLabelElement>;
    input?:InputHTMLAttributes<HTMLInputElement>
    container?:HtmlHTMLAttributes<HTMLElement>
  };
}

export default function LabedInput({label,props}:props) 
{
  return (
    <LabedField label={label} props={props} >
      <Input {...props?.input} />
    </LabedField>
  )
}
