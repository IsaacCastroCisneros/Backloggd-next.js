"use client"
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { global } from '../context/GlobalContext'

export default function LoadSpinner() 
{
  const{loadSpinner}=useContext(global)

  if(loadSpinner)
  {
      return (
        <div className='bg-myPink text-[#fff] fixed right-[2rem] bottom-[2rem] p-[.7rem] rounded-[.5rem] z-[9999999999999999]'>
            <FontAwesomeIcon size="3x"  icon={faSpinner} spin/>
        </div>
      )
  }
  return null
}
