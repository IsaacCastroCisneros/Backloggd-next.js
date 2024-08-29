"use client"

import React, { FormEvent } from 'react'
import ListForm from '../../../components/ListForm/ListForm'
import useListFormData from '../../../hooks/useListFormData'
import listItem from '../../../interfaces/listItem'

interface props
{
  lists:Array<listItem>
}

export default function ClientContent(props:props) 
{
    /* const{list,setList,handleDeleteItemList,submit}=useListFormData()


    async function submittingForm(e:FormEvent<HTMLFormElement>)
    {
      const data = submit(e)
     
    }



  return (
    <ListForm list={list} setList={setList} handleDeleteItemList={handleDeleteItemList} submittingForm={submittingForm} />
  ) */

    return null
}
