"use client"

import user from '@/interfaces/user'
import React, { FormEvent } from 'react'
import creatingList from '../server/creatingList'
import ListForm from '../../components/ListForm/ListForm'
import useListFormData from '../../hooks/useListFormData'

interface props
{
  user:user
}

export default function ClientCotent({user}:props) 
{
  
  const{list,setList,handleDeleteItemList,submit}=useListFormData()


  async function submittingForm(e:FormEvent<HTMLFormElement>)
  {
    const data = submit(e)
    await creatingList({...data,user_id:user.id,list})
  }


  return (
   <ListForm submittingForm={submittingForm} list={list} setList={setList} handleDeleteItemList={handleDeleteItemList} />
  );
}
