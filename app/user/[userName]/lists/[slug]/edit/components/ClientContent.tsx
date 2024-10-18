"use client"

import React, { FormEvent, useContext } from 'react'
import ListForm from '../../../components/ListForm/ListForm'
import useListFormData from '../../../hooks/useListFormData'
import listItem from '../../../interfaces/listItem'
import listData from '../../../interfaces/listData'
import updatingList from '../server/updatingList'
import  { global } from '@/app/context/GlobalContext'

interface props
{
  lists:Array<listItem>
  listData:listData
}

export default function ClientContent({lists:initialList,listData}:props) 
{
    const{lists,setList,handleDeleteItemList,submit}=useListFormData(initialList)
    const{setMsg}=useContext(global)

    async function submittingForm(e:FormEvent<HTMLFormElement>)
    {
      const data = submit(e);
     
      try
      {

        await updatingList({
          oldList: { ...listData, list:initialList },
          newList: { ...data, list:lists },
        });
        setMsg({msg:"List Updated",type:"success",show:true})
      }
      catch(err)
      {
        setMsg({msg:"An Error was Occurred",type:"fail",show:true})
      }

    }

  return (
    <ListForm listData={listData} list={lists} setList={setList} handleDeleteItemList={handleDeleteItemList} submittingForm={submittingForm} type="updating"/>
  )
}

