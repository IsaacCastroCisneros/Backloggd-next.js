"use client"

import LabedInput from '@/components/LabedInput/LabedInput'
import LabedTextarea from '@/components/LabedTextarea/LabedTextarea'
import user from '@/interfaces/user'
import React, { FormEvent, useState } from 'react'
import updatingList from '../../server/updatingList'
import Card from './components/Card'
import Searcher from './components/Searcher'
import listItem from './interfaces/listItem'

interface props
{
  user:user
}


export default function ClientCotent({user}:props) 
{
  const[list,setList]=useState<Array<listItem>>([])
  
  async function submittingForm(e:FormEvent<HTMLFormElement>)
  {
    e.preventDefault()
    const formData= new FormData(e.currentTarget)
    const data=Object.fromEntries(formData) as {description:string,name:string}

    await updatingList({...data,user_id:user.id})
  }

  console.log(list)

  function handleDeleteItemList(id:string)
  {
    const newList = [...list]

    setList(newList.filter(item=>item.listId!==id))
  }

  return (
    <>
      <div>
        <form action="" onSubmit={submittingForm} className="mb-[1rem]">
          <LabedInput label="List Name" props={{ input: { name: "name" } }} />
          <LabedTextarea
            label="Description"
            props={{ textarea: { name: "description" } }}
          />
        </form>
        <Searcher setList={setList} list={list} />
      </div>
      <div className='grid grid-cols-[repeat(5,1fr)] gap-[.7rem] mob1:grid-cols-[repeat(3,1fr)]'>
        {
          list.map(item=>
            (
              <Card handleDeleteItemList={handleDeleteItemList} key={item.listId} imgUrl={item.cover} {...item}/>
            ))
        }
      </div>
    </>
  );
}
