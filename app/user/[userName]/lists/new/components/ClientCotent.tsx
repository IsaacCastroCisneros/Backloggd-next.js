"use client"

import LabedInput from '@/components/LabedInput/LabedInput'
import LabedTextarea from '@/components/LabedTextarea/LabedTextarea'
import user from '@/interfaces/user'
import React, { FormEvent } from 'react'
import updatingList from '../server/updatingList'

interface props
{
  user:user
}

export default function ClientCotent({user}:props) 
{

    async function submittingForm(e:FormEvent<HTMLFormElement>)
    {
      e.preventDefault()
      const formData= new FormData(e.currentTarget)
      const data=Object.fromEntries(formData) as {description:string,name:string}

      await updatingList({...data,user_id:user.id})
    }
  
    return (
      <div>
        <form action="" onSubmit={submittingForm}>
          <LabedInput  label='List Name' props={{input:{name:"name"}}} />
          <LabedTextarea label='Description' props={{textarea:{name:"description"}}}/>
        </form>        
      </div>
    )
}
