"use client"

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import {usePathname, useRouter, useSearchParams}  from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGamepad, faGear, faList, faPen, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import Option from './components/Option'
import user from '@/interfaces/user'
import Link from 'next/link'
import UserMenu from './components/UserMenu/UserMenu'
import Searcher from './components/Searcher'
import MobOption from './components/MobOption/MobOption'


export default  function Navbar() 
{
  const router = useRouter()
  const path = usePathname()

  const[params,setParams]=useState<string>("")
  const {data:session} = useSession() as {data:{user:user}|null}
  const[heigth,setHeigth]=useState<{show:boolean,h:number}>({show:false,h:0})
  const ref = useRef(null)
  
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
    
    const currentH = ref.current

    if(currentH===null)return
    setHeigth(prev=>({...prev,h:(currentH as HTMLElement).offsetHeight})) 
    
  },[])

  function handleSingOut()
  {
    signOut()
  }

  const {username} = !session ? {username:""}:session.user  

  function handleToggleHeigth()
  {
    setHeigth((prev) => ({ ...prev, show: !prev.show }))
  }

  return (
    <header className="relative z-[9]">
      <nav className="custom-container flex justify-end gap-[1rem] py-[.8rem] items-center">
        {path !== "/" && (
          <Link
            className="block mr-auto text-[#fff] text-[26px] font-bold"
            href="/"
          >
            Backloggd
          </Link>
        )}
        <div className="flex gap-[.8rem] mob:hidden">
          {session && (
            <UserMenu username={username} handleSingOut={handleSingOut} />
          )}
          {session === null && (
            <ul className="flex items-center gap-[1rem]">
              <Option href={"/users/login"}>Log In</Option>
              <Option href={"/users/sign_up"}>Register</Option>
            </ul>
          )}
          <Searcher
            submittingForm={submittingForm}
            params={params}
            setParams={setParams}
          />
        </div>
        <button
          className="hidden mob:block text-text3 px-[.5rem] py-[.3rem] rounded-[.3rem] border-[1px] border-border"
          onClick={handleToggleHeigth}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
      </nav>
      <div
        className="duration-200 overflow-hidden"
        style={{ height: heigth.show ? heigth.h : 0 }}
      >
        <nav ref={ref} className="custom-container flex flex-col">
          <ul className="gap-x-[.6rem] gap-y-[.5rem] grid mob1:grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] mb-[1rem]">
            <MobOption
              label="profile"
              icon={faUser}
              href={`/user/${username}`}
            />
            <MobOption
              label="settings"
              icon={faGear}
              href={`/user/${username}/edit`}
            />
            <MobOption
              label="games"
              icon={faGamepad}
              href={`/user/${username}/games`}
            />
            <MobOption
              label="lists"
              icon={faList}
              href={`/user/${username}/lists`}
            />
            <MobOption
              label="reviews"
              icon={faPen}
              href={`/user/${username}/reviews`}
            />
            <MobOption
              label="log out"
              icon={faSignOut}
              onClick={handleSingOut}
            />
          </ul>
          <Searcher
            submittingForm={submittingForm}
            props={{
              input: { className: "flex-1" },
              div: { className: "w-full flex" },
            }}
            params={params}
            setParams={setParams}
          />
        </nav>
      </div>
    </header>
  );
}
