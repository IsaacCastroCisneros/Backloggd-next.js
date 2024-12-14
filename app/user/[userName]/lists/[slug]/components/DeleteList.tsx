"use client"

import { global } from '@/app/context/GlobalContext'
import React, { useContext } from 'react'
import AreYouSure from './components/AreYouSure'
import props from './interfaces/props'

export default function DeleteList({listId,user}:props) 
{
  const{setPopup} = useContext(global)
 

  return (
  <button className='text-text hover:text-text4 text-[14px] mob1:text-[11px]' onClick={()=>setPopup({content:<AreYouSure user={user} listId={listId} />,clickOutside:false,show:true})}>
    Delete list
  </button>
  )
}
