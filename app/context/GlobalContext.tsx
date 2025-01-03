"use client"

import React,{ReactNode,Dispatch,SetStateAction,useState, Suspense} from 'react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient,QueryClientProvider } from 'react-query'

const queryClient= new QueryClient

interface values
{
  msg:msg
  setMsg:Dispatch<SetStateAction<msg>>
  popup:popupProps
  setPopup:Dispatch<SetStateAction<popupProps>>
  setloadSpinner:Dispatch<SetStateAction<boolean>>
  loadSpinner:boolean
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
  const[loadSpinner,setloadSpinner]=useState<boolean>(false)
  const[popup,setPopup]=useState<popupProps>({show:false,content:<></>,clickOutside:true})

  const values:values =
  {
    msg,
    setMsg,
    popup,
    setPopup,
    setloadSpinner,
    loadSpinner
  }

  return (
    <global.Provider value={values}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Suspense>{children}</Suspense>
        </SessionProvider>
      </QueryClientProvider>
    </global.Provider>
  );
}
