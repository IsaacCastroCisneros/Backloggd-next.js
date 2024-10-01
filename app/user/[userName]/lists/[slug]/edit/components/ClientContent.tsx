"use client"

import React, { FormEvent } from 'react'
import ListForm from '../../../components/ListForm/ListForm'
import useListFormData from '../../../hooks/useListFormData'
import listItem from '../../../interfaces/listItem'
import listData from '../../../interfaces/listData'
import updatingList from '../server/updatingList'

interface props
{
  lists:Array<listItem>
  listData:listData
}

export default function ClientContent({lists:initialList,listData}:props) 
{
    const{lists,setList,handleDeleteItemList,submit}=useListFormData(initialList)


    async function submittingForm(e:FormEvent<HTMLFormElement>)
    {
      const data = submit(e);
      await updatingList({oldList:listData,newList:data})
    }

  return (
    <ListForm listData={listData} list={lists} setList={setList} handleDeleteItemList={handleDeleteItemList} submittingForm={submittingForm} />
  )
}
