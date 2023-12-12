"use client"

import React,{ReactNode,Dispatch,SetStateAction,useState} from 'react'
import { SessionProvider } from 'next-auth/react'

interface values
{
  msg:msg
  setMsg:Dispatch<SetStateAction<msg>>
  popup:popupProps
  setPopup:Dispatch<SetStateAction<popupProps>>
}
interface popupProps
{
    show:boolean
    content:ReactNode
    clickOutside?:boolean
}

export const global=React.createContext<values>({} as values)

interface msg {
  show: boolean;
  msg: string;
  type: "alert" | "fail" | "success";
}

export default function GlobalContext({children}:{children:ReactNode}) 
{
  const[msg,setMsg]=useState<msg>({show:false,msg:"",type:"fail"})
  const[popup,setPopup]=useState<popupProps>({show:false,content:<></>,clickOutside:true})

  const values:values =
  {
    msg,
    setMsg,
    popup,
    setPopup
  }

    

  return (
    <global.Provider value={values}>
      <SessionProvider>{children}</SessionProvider>
    </global.Provider>
  );
}
