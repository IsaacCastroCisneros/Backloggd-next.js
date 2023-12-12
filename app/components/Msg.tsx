"use client"
import React,{useContext,useState,useEffect} from 'react'
import { global } from '../context/GlobalContext'
import { faCheck, faCheckCircle, faExclamationCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Msg() 
{
  const{msg,setMsg}=useContext(global)
  const{type,msg:message,show}=msg

  const styles=
  {
    success:{icon:faCheckCircle,style:"text-[#32a852]"},
    fail:{icon:faXmarkCircle,style:"text-[#e81d13]"},
    alert:{icon:faExclamationCircle,style:""} 
  }

  const style = styles[type]

  useEffect(()=>
  {
    if(!show)return
    setTimeout(()=>
    {
      setMsg(prev=>{return {...prev,show:false}})
    },2000)

  },[show])

  return (
    <>
      {(
        <div className={`fixed right-[1rem] duration-[200ms] bg-field text-text text-[1.3rem] flex gap-[1rem] items-center px-[.8rem] py-[.4rem] rounded-[.5rem] border-[1px] border-text ${show ? "opacity-1 top-[1rem]":"top-0 opacity-0"} z-[9999999999999999]`}>
          <FontAwesomeIcon icon={style.icon} className={style.style} />
          {message}
        </div>
      )}
    </>
  );
}
