"use client"

import React, { FormEvent, useContext } from 'react'
import ListForm from '../../../components/ListForm/ListForm'
import useListFormData from '../../../hooks/useListFormData'
import listItem from '../../../interfaces/listItem'
import listData from '../../../interfaces/listData'
import updatingList from '../server/updatingList'
import  { global } from '@/app/context/GlobalContext'
import { useRouter } from 'next/navigation'
import user from '@/interfaces/user'

interface props
{
  lists:Array<listItem>
  listData:listData
  user:user
}

export default function ClientContent({lists:initialList,listData,user}:props) 
{
    const{lists,setList,handleDeleteItemList,submit}=useListFormData(initialList)
    const{setMsg}=useContext(global)

    async function submittingForm(e:FormEvent<HTMLFormElement>)
    {
      const data = submit(e);
     
      const{err}=JSON.parse(await updatingList({
        oldList: { ...listData, list:initialList },
        newList: { ...data, list:lists },
      }))

      if(err) return  setMsg({msg:"An Error was Occurred",type:"fail",show:true})

        
        window.location.href = `/user/${user.username}/lists`
        setMsg({msg:"List Updated",type:"success",show:true})
 
    }

  return (
    <ListForm listData={listData} list={lists} setList={setList} handleDeleteItemList={handleDeleteItemList} submittingForm={submittingForm} type="updating"/>
  )
}

