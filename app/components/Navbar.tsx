"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import {useRouter, useSearchParams}  from "next/navigation"
import { signOut } from "next-auth/react"

export default function Navbar() 
{
  /* nada */
  const router = useRouter()
  const[params,setParams]=useState<string>("")
  const search =useSearchParams()

  function submittingForm(e:FormEvent<HTMLFormElement>)
  {
    e.preventDefault()
    router.push(`/games/search?game=${params}&offset=0`)
  }

  useEffect(()=>
  {
    if(search)
    {
      const game = search.get("game")
      if(game!==null)setParams(game)
    }
  },[])

  return (
    <div>
      <button className='bg-[#fff]' onClick={()=>signOut()}>
        out
      </button>
      <form onSubmit={submittingForm}>
        <input value={params} name='search' type="text" onChange={(e)=>setParams(e.target.value)} />
      </form>
    </div>
  );
}
