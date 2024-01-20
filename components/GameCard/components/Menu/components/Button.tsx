import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React from 'react'

interface props extends FontAwesomeIconProps
{
   
}

export default function Button({icon}:props)
{
    return(
      <button className='text-[1.1rem] text-gray3'>
        <FontAwesomeIcon icon={icon} />
      </button>
    )
}
