import React, {HtmlHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from 'react'
import LabedField from './LabedField';
import Textarea from './Textarea';

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

