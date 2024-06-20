"use client"

import LabedInput from '@/components/LabedInput'
import LabedTextarea from '@/components/LabedTextarea'
import user from '@/interfaces/user'
import React, { FormEvent, useState } from 'react'
import updatingList from '../../server/updatingList'
import Card from './components/Card'
import Searcher from './components/Searcher'
import listItem from './interfaces/listItem'
import Separator from '@/components/Separator'
import Label from '@/components/Label'
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

  function handleDeleteItemList(id:string)
  {
    const newList = [...list]

    setList(newList.filter(item=>item.listId!==id))
  }

  return (
    <>
      <h1 className='text-[28px] text-text4 font-medium'>
        Editing your list
      </h1>
      <Separator className='my-[.3rem]'/>
      <div>
        <form action="" onSubmit={submittingForm} className="mb-[1rem]">
          <LabedInput label="List Name" props={{ input: { name: "name" },container:{className:"mb-[.3rem]"} }} />
          <LabedTextarea
            label="Description"
            props={{ textarea: { name: "description" } }}
          />
        </form>
        <Label>Add a game</Label>
        <div className='max-w-[20rem]'>
        <Searcher setList={setList} list={list} />
        </div>
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
