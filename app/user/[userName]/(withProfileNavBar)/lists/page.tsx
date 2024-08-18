"use server"

import get from '@/server/get'
import React from 'react'
import getUser from '../../server/getUser'
import user from '@/interfaces/user'
import list from './interfaces/list'
import List from './components/List/List'
import PaginationPanel from './components/PaginationPanel/PaginationPanel'

export default async function page({params,searchParams}:any) 
{
  const{userName}= params
  const page =searchParams.page||1
  const {res:userRes} = JSON.parse(await getUser({userName})) 

  const{id}=userRes[0] as user
  const {res:all} =JSON.parse(await get({query:"select count(*) from gameList where user_id=?",data:id})) 
  const allPages = Math.round(all[0]["count(*)"]/12)
  const {res,err} =JSON.parse(await get({query:"select * from gameList where user_id=? limit 12 offset ?",data:[id,getNum(page)]})) 

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-y-[1rem]">
        {res.map((list: list) => (
          <List key={list.id} {...list} user={userRes[0]} />
        ))}
      </div>
      <PaginationPanel path={`/user/${userName}/lists`} pages={allPages} page={Number(page)} />
    </>
  );
}

function getNum(n:number)
{
   const myN = Number(n)
   if(myN===1)return 0

   return (myN*12)-12
}