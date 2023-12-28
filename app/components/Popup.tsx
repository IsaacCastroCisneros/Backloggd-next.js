"use client"
import React, {useContext, useEffect, useState} from 'react'
import { global } from '../context/GlobalContext';
import { twMerge } from 'tailwind-merge';


export default function Popup() 
{
  const{popup,setPopup}=useContext(global)
  const[myShow,setMyShow]=useState<boolean>(false)
  const{show,content,clickOutside}=popup

  function hiddenShowing()
  {
     if(show)
     {
         return(
             {
                container:"pointer-events-auto",
                layer:"opacity-[.8] pointer-events-auto",
                popup:"translate-y-0 opacity-[1] pointer-events-auto"
            }
         )
     }
     return(
        {
            container:"pointer-events-none",
            layer:"opacity-0 pointer-events-none",
            popup:"opacity-0 translate-y-[2rem] pointer-events-none"
        }
     )
  }

  function hideByClick()
  {
    if(!clickOutside)return
    setPopup(prev=>{return{...prev,show:false}})
  }

  useEffect(()=>
  {
    async function get()
    {
      setMyShow(await showSwitcher()) 
    }
    get()
  })

  async function showSwitcher()
  {
    if(show)return show
    await bump()
    return show
  }

  return (
    <div
      className={twMerge(
        "w-[100%] h-[100vh] px-[1rem] flex justify-center items-center duration-200 fixed top-0 left-0 z-50",
        hiddenShowing().container
      )}
    >
      <div
        className={twMerge(
          "bg-[#000] w-full h-full absolute duration-200",
          hiddenShowing().layer
        )}
        onClick={hideByClick}
      ></div>
      <div
        className={twMerge(
          "duration-200 w-[100%] flex justify-center",
          hiddenShowing().popup
        )}
      >
        {myShow && <>{content}</>}
      </div>
    </div>
  );
}

async function bump()
{
  return new Promise((res)=>
  {
    setTimeout(()=>
    {
       res(null)
    },200)
  })
}