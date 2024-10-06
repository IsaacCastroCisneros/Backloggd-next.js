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

      await updatingList({
        oldList: { ...listData, list: getIdsFromList(initialList) },
        newList: { ...data, list: getIdsFromList(lists) },
      });
    }

  return (
    <ListForm listData={listData} list={lists} setList={setList} handleDeleteItemList={handleDeleteItemList} submittingForm={submittingForm} />
  )
}

function getIdsFromList(lists:Array<{id:string}>)
{
  return lists.map(list=>list.id)
}
