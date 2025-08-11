"use client"

import React,{useContext, useState} from 'react'
import Form from '../../components/Form'
import Input from '@/components/Input'
import { signIn,SignInResponse } from "next-auth/react"
import logUser from '@/interfaces/logUser'
import useErrLIst from '@/hooks/useErrLIst'
import {login as schema} from "@/util/validations"
import ErrServer from '../../components/ErrServer'
import { global } from '@/app/context/GlobalContext'
import { useRouter } from 'next/navigation'

export default function ClientContent() 
{
  const[values,setValues]=useState<logUser>(
    {
       email:"isaac@gmail.com",
       password:"isaac*"
    })
  const errList = useErrLIst({schema,values})
  const [errServer,setErrServer]=useState<Array<string>|null>(null)
  const[loading,setLoading]=useState<boolean>(false)
  const{setMsg}=useContext(global)
  const router = useRouter()

  async function submittingForm()
  {
    setLoading(true)
    const {error} = await signIn("credentials", {
      email:values.email,
      password:values.password,
      redirect: false,
    }) as SignInResponse
    setLoading(false)
    console.log(error)
    console.log(process.env.DB_HOST)

    if(error)return setErrServer(JSON.parse(error).errors)
    setMsg({show:true,type:'success',msg:"You are in"}) 
    setErrServer(null)
    router.push("/")
  }

  const errors = errList || {} as logUser

  return (
    <>
      {errServer && <ErrServer errors={errServer} />}
      <Form
        label="log in"
        isLoading={loading}
        title="Log in"
        isOk={errList === null}
        submit={submittingForm}
      >
        <div className='p-[.8rem] rounded-[.5rem] bg-myPink3 text-text9'>
          <strong>User for testing:</strong><br/>
          -isaac@gmail.com<br/>
          -isaac*<br/>
        </div>
        <Input
          name="email"
          defaultValue="isaac@gmail.com"
          type="email"
          placeholder="Email address"
          msg={errors.email}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <Input
          name="password"
          placeholder="Password"
          defaultValue="isaac*"
          minLength={6}
          msg={errors.password}
          underText="Minimum 6 characters"
          type="password"
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
      </Form>
    </>
  );
}
