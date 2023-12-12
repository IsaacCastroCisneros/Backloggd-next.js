"use client"

import React,{use, useContext, useState} from 'react';
import Form from '../../components/Form';
import Input from '@/components/Input';
import useErrLIst from '@/hooks/useErrLIst';
import {signUp as schema} from "@/util/validations" 
import signUp from '../server/signUp';
import fullUser from '../../intefaces/fullUser';
import ErrServer from '../../components/ErrServer';
import { global } from '@/app/context/GlobalContext';
import { signIn,SignInResponse } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function ClientContent() 
{
  const[values,setValues]=useState<fullUser>(
    {
        userName:"",
        email:"",
        password:"",
        passwordRetry:""
    }
  )
  const[errServer,setErrServer]=useState<Array<string>|null>(null)
  const[loading,setLoading]=useState<boolean>(false)
  const errList = useErrLIst({schema,values})
  const {setMsg}=useContext(global)
  const {push}=useRouter()

  const{passwordRetry,...userData}=values 

  const errors = errList || {} as fullUser

  async function submittingForm()
  {
    setLoading(true)
    const{err}= await signUp({user: userData as fullUser,query:"insert into users set ?"})
    setLoading(false)
    if (err) 
    {
      setErrServer(err)
      return
    }
    setMsg({show:true,msg:"Account Created",type:"success"})
    await signIn("credentials", {
      email:values.email,
      password:values.password,
      redirect: false,
    }) as SignInResponse
    setErrServer(null)
    push("/")
  }

  return (
    <>
      {errServer && <ErrServer errors={errServer} />}
      <Form
        label="Register"
        title="Registration"
        isOk={errList === null}
        isLoading={loading}
        submit={submittingForm}
      >
        <Input
          name="username"
          maxLength={16}
          placeholder="Username"
          underText="Maximum of 16 characters"
          msg={errors.userName}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, userName: e.target.value };
            })
          }
        />
        <Input
          name="email"
          msg={errors.email}
          type="email"
          placeholder="Email address"
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          msg={errors.password}
          minLength={6}
          underText="Minimum 6 characters"
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <Input
          placeholder="Password confirmation"
          type="password"
          name="passwordRetry"
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, passwordRetry: e.target.value };
            })
          }
          msg={errors.passwordRetry}
        />
      </Form>
    </>
  );
}


