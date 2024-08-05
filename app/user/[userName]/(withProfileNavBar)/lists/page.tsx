"use server"

import get from '@/server/get'
import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import list from './interfaces/list'
import List from './components/List'

export default async function page({params}:any) 
{
  const{userName}= params
  const {res:userRes} = JSON.parse(await getUser({userName})) 
  const{id}=userRes[0] as user
  const {res,err} =JSON.parse(await get({query:"select * from gameList where user_id=?",data:id})) 

  return (
   <>
     {
      res.map((list:list)=>
      (
        <List key={list.id} {...list}/>
      ))
     }
   </>
  )
}
