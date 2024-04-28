import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface props
{
    label:string
    icon:IconProp
}

export default function Content({label,icon}:props) 
{
  return (
    <>
      {label}
      <FontAwesomeIcon icon={icon} />
    </>
  );
}
