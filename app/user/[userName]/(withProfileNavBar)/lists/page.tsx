"use server"

import get from '@/server/get'
import React from 'react'
import list from '@/interfaces/list'
import List from './components/List/List'
import PaginationPanel from '@/components/PaginationPanel/PaginationPanel'
import Button from '@/components/Button'
import Link from 'next/link'
import getOffset from '@/components/PaginationPanel/util/getOffset'
import authorizeUser from '@/util/authorizeUser'
import user from '@/interfaces/user'

export default async function page({params,searchParams}:any) 
{
  const{userName}= params
  const{res:authorizeRes}= await authorizeUser({userName})
  const{user,authorized}=authorizeRes[0]
  const {id}=user

  const page =Number(searchParams.page||1)
  const {res:all} =JSON.parse(await get({query:"select count(*) from gameList where user_id=?",data:id})) 
  const allLists = all[0]["count(*)"]
  const {res} =JSON.parse(await get({query:"select * from gameList where user_id=? order by id desc limit 12 offset ?",data:[id,getOffset(page,12)]})) 

  return (
    <>
      {authorized && (
        <Button>
          <Link className="px-[2.3rem]" href={`/user/${userName}/lists/new`}>
            Create List
          </Link>
        </Button>
      )}
      <span className="mt-[1.5rem] mb-[.3rem] block text-text">
        {allLists} Lists
      </span>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-y-[1rem]">
        {res.map((list: list) => (
          <List key={list.id} {...list} />
        ))}
      </div>
      <PaginationPanel
        path={`/user/${userName}/lists`}
        maxBypage={12}
        allElements={allLists}
        page={Number(page)}
      />
    </>
  );
}

