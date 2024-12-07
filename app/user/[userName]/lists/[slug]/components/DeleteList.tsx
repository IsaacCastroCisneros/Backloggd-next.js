"use client"
import { global } from '@/app/context/GlobalContext'
import React, { useContext } from 'react'
import AreYouSure from './components/AreYouSure'

export default function DeleteList() 
{
  const{setPopup} = useContext(global)
 

  return (
  <button className='text-text hover:text-text4 text-[14px]' onClick={()=>setPopup({content:<AreYouSure/>,clickOutside:false,show:true})}>
    Delete list
  </button>
  )
}
