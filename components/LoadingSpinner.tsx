import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { HtmlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends HtmlHTMLAttributes<HTMLElement>
{

}

export default function LoadingSpinner({className,...props}:props) {
  return (
    <div {...props} className={twMerge('flex justify-center text-text2 mt-[5rem]',className)}>
        <FontAwesomeIcon size='7x' icon={faSpinner} spin/>
    </div>
  )
}
