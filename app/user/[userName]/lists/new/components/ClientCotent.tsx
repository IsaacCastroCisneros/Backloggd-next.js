"use client"

import user from '@/interfaces/user'
import React, { FormEvent, useContext } from 'react'
import creatingList from '../server/creatingList'
import ListForm from '../../components/ListForm/ListForm'
import useListFormData from '../../hooks/useListFormData'
import { global } from '@/app/context/GlobalContext'

interface props
{
  user:user
}

export default function ClientCotent({user}:props) 
{
  
  const{lists,setList,handleDeleteItemList,submit}=useListFormData()
  const{setMsg}=useContext(global)


  async function submittingForm(e:FormEvent<HTMLFormElement>)
  {
    const data = submit(e)
    try
    {
      await creatingList({...data,user_id:user.id,lists})
      setMsg({msg:"List Created",type:"success",show:true})

       window.location.href = `/user/${user.username}/lists`
    }
    catch(err)
    {
      setMsg({msg:"An error was occurred",type:"fail",show:true})
    }
  }


  return (
   <ListForm type="creating" submittingForm={submittingForm} list={lists} setList={setList} handleDeleteItemList={handleDeleteItemList} />
  );
}
