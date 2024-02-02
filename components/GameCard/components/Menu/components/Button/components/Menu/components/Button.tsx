import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
    icon:IconProp
    children:ReactNode
}

export default function Button({icon,children,...props}:props) {
  return (
    <li>
      <button
        {...props}
        className="text-[#fff] flex text-text3 hover:text-[#fff] text-[13px] gap-[.3rem] items-center"
      >
        <FontAwesomeIcon icon={icon} />
        <span className=" whitespace-nowrap">{children}</span>
      </button>
    </li>
  );
}
