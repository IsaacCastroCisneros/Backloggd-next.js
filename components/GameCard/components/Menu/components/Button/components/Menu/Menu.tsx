"use client"

import React, { ReactNode, useContext, useEffect, useState } from 'react'
import Button from "./components/Button"
import { faBookOpen, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { global } from '@/app/context/GlobalContext';
import LogForm from '@/components/LogForm/LogForm';
import { useSession } from 'next-auth/react';
import user from '@/interfaces/user';
import { gameCard } from '@/components/GameCard/GameCard';

interface props
{
  show:boolean
}

export default function Menu({show}:props) 
{
  const{setPopup}=useContext(global)
  const{gameCardData,user}=useContext(gameCard)
  const[realShow,setRealShow]=useState<boolean>(false)


  function isGameCardData():ReactNode
  {
    if(gameCardData)return <LogForm {...gameCardData} user={user as user}/>
    return <></>
  }

  useEffect(()=>
  {
    if (show) return setRealShow(show);
    
    setTimeout(() => {
      setRealShow(false);
    }, 200);

  },[show])



  return (
    <>
      {
        realShow&&
        <div
          className={`pl-[1rem] absolute right-0 duration-200 cursor-default bottom-[-.2rem] ${
            show
              ? "opacity-1 pointer-events-auto translate-x-[100%]"
              : "opacity-0 pointer-events-none translate-x-[90%]"
          }`}
        >
          <ul
            className={` bg-field border-[1px] border-border p-[.3rem] rounded-[.3rem] flex flex-col gap-[.3rem]`}
          >
            <Button
              icon={faBookOpen}
              onClick={() =>
                setPopup({ show: true, content: isGameCardData() })
              }
            >
              Edit Log
            </Button>
            <Button icon={faLayerGroup}>List Entry</Button>
          </ul>
        </div>
      }
    </>
  );
}
