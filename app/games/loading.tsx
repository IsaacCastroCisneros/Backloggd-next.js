import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center text-text2 mt-[5rem]'>
      <FontAwesomeIcon size='7x' icon={faSpinner} spin/>
    </div>
  )
}