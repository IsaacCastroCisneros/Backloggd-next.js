import React, {HtmlHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from 'react'
import Input from '../Input'
import { twMerge } from 'tailwind-merge';
import LabedField from '../LabedField/LabedField';
import Textarea from '../Textarea';

interface props
{
  label: string;
  props?: {
    label?: LabelHTMLAttributes<HTMLLabelElement>;
    textarea?:TextareaHTMLAttributes<HTMLTextAreaElement>
    container?:HtmlHTMLAttributes<HTMLElement>
  };
}

export default function LabedTextarea({label,props}:props) 
{
  
  return (
    <LabedField label={label} props={props}>
      <Textarea {...props?.textarea} />
    </LabedField>
  );
}

