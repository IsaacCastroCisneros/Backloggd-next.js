"use client"

import user from '@/interfaces/user'
import React, { FormEvent, useContext } from 'react'
import creatingList from '../server/creatingList'
import ListForm from '../../components/ListForm/ListForm'
import useListFormData from '../../hooks/useListFormData'
import { global } from '@/app/context/GlobalContext'
import { useRouter } from 'next/navigation'

interface props
{
  user:user
}

export default function ClientCotent({user}:props) 
{
  
  const{lists,setList,handleDeleteItemList,submit}=useListFormData()
  const{setMsg,setloadSpinner}=useContext(global)
  const router = useRouter()


  async function submittingForm(e:FormEvent<HTMLFormElement>)
  {
    const data = submit(e)
   
    if(data.name==="")
    {
      return  setMsg({msg:"List's name is needed",type:"fail",show:true})
    }

    try
    {
      setloadSpinner(true)
      await creatingList({...data,user_id:user.id,lists,userName:user.username})
      setloadSpinner(false)
      setMsg({msg:"List Created",type:"success",show:true})

      router.push(`/user/${user.username}/lists`)
      router.refresh()
    }
    catch(err)
    {
      setloadSpinner(false)
      setMsg({msg:"An error was occurred",type:"fail",show:true})
    }
  }


  return (
   <ListForm type="creating" submittingForm={submittingForm} list={lists} setList={setList} handleDeleteItemList={handleDeleteItemList} />
  );
}
