"use server"

import React from 'react'
import list from '../interfaces/list'
import get from '@/server/get'

export default async function List({id}:list) 
{
  const {res}= JSON.parse(await get({query:"select * from gameListItem where list_id=?",data:id})) 

  console.log(res)

  return (
    <div className='bg-[#fff]'>
      lelos
    </div>
  )
}
