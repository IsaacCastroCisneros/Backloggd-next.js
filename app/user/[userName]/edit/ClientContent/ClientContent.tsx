
"use client"

import LabedInput from '@/components/LabedInput/LabedInput'
import LabedTextarea from '@/components/LabedTextarea/LabedTextarea'
import user from '@/interfaces/user'
import React, { FormEvent, useContext } from 'react'
import updateUser from './server/updateUser'
import { SignInResponse, signIn, useSession } from 'next-auth/react'
import { global } from '@/app/context/GlobalContext'
import Button from '@/components/Button'

interface props extends user
{

}

export default function ClientContent(props:props) 
{

    const{setMsg}=useContext(global)
    const{data} =useSession()
    const{user}=data || {user:{}}

    const{username,twitter,bio,id}=props 

    async function submittingForm(e:FormEvent<HTMLFormElement>)
    {
       e.preventDefault();
       const formData= new FormData(e.currentTarget)
       const data=Object.fromEntries(formData)

       const{err}=await updateUser({...props,...data})
       if(err)return setMsg({msg:"an error was occurred",type:"fail",show:true})

       const {error} = await signIn("credentials", {
        email:props.email,
        password:data.password||props.password,
        redirect: false,
      }) as SignInResponse

      if(!error)return setMsg({msg:"Profile Updated",type:"success",show:true})

    }

  return (
    <>
      <h1 className=" text-text4 text-[32px] font-medium mb-[.8rem] block">
        Profile
      </h1>
      <form className="w-full" onSubmit={submittingForm}>
        <div className="flex gap-[1rem]">
          <LabedInput
            label="Username"
            props={{
              input: {
                maxLength: 16,
                name: "username",
                defaultValue: username,
              },
              container: { className: "flex-1" },
            }}
          />
          <LabedInput
            label="Twitter handle"
            props={{
              input: { maxLength: 602, name: "twitter", defaultValue: twitter },
              container: { className: "flex-1" },
            }}
          />
        </div>
        <LabedTextarea
          label="Biography"
          props={{
            textarea: { maxLength: 602, name: "bio", defaultValue: bio },
          }}
        />
        <Button myType="cancel">Cancel</Button>
        <Button>Save Changes</Button>
      </form>
    </>
  );
    
}
