"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import {usePathname, useRouter, useSearchParams}  from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Option from './components/Option'
import user from '@/interfaces/user'
import Link from 'next/link'
import UserMenu from './components/UserMenu'


export default  function Navbar() 
{
  const router = useRouter()
  const path = usePathname()

  const[params,setParams]=useState<string>("")
  const {data:session} = useSession() as {data:{user:user}|null}
  
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

  function handleSingOut()
  {
    signOut()
    router.push("/")
  }

  const {username} = !session ? {username:""}:session.user  

  return (
    <header>
      <nav className="custom-container flex justify-end gap-[1rem] py-[.8rem] items-center">
        {path !== "/" && (
          <Link
            className="block mr-auto text-[#fff] text-[26px] font-bold"
            href="/"
          >
            Backloggd
          </Link>
        )}
        {session && (
          <UserMenu username={username} handleSingOut={handleSingOut} />
        )}
        {session === null && (
          <ul className="flex items-center gap-[1rem]">
            <Option href={"/users/login"}>Log In</Option>
            <Option href={"/users/sign_up"}>Register</Option>
          </ul>
        )}
        <form onSubmit={submittingForm}>
          <div className="bg-field w-fit py-[.2rem] px-[.3rem] border-[1px] border-border rounded-[.2rem]">
            <input
              className="bg-[transparent] outline-none text-[#fff]"
              value={params}
              name="search"
              type="text"
              onChange={(e) => setParams(e.target.value)}
            />
            <button className="text-text6 hover:text-[#fff]">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
      </nav>
    </header>
  );
}
