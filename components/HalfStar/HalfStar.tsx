import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends HTMLAttributes<HTMLElement>
{
  iconSize:SizeProp
  side:"left"|"rite"
  width:string
}

export const HalfStar = (props:props) => 
{
  const{iconSize,side,className,width,...myProps}=props
  const finalSide = side==="left" ? "":"scale-x-[-1]"

  return (
    <div className={twMerge(`w-[calc(${width}_/_2)] overflow-hidden ${finalSide}`,className) } {...myProps}>
      <button>
        <FontAwesomeIcon icon={faStar} size={iconSize as SizeProp | undefined} />
      </button>
    </div>
  );
}
