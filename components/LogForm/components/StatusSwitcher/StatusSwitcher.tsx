"use client"

import { faChevronDown, faGamepad, faPlay, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, HtmlHTMLAttributes, SetStateAction, useEffect, useState } from 'react'
import useClickOutside from '@/hooks/useClickOutside'
import statusManager from './interfaces/statusManger'
import StatusOption from './components/StatusOption'
import myStatus from './types/myStatus'
import config from '../../../../interfaces/config'
import { twMerge } from 'tailwind-merge'


interface props extends HtmlHTMLAttributes<HTMLDivElement>
{
  setConfig:Dispatch<SetStateAction<config>>
   currentStatus:myStatus
}


export default function StatusSwitcher(myProps:props) 
{
  const[statusManager,setStatusManager]=useState<statusManager>({show:false,status:"completed",active:false,playing:false})
  const { setConfig, currentStatus, className, ...props } = myProps;

  const { ref } = useClickOutside(() =>
    setStatusManager((prev) => {
      return { ...prev, show: false };
    })
  );

  const{active,show,status,playing}=statusManager

  const colors:{[index:string]:string}=
  {
    played:"bg-myPink",
    shelved:"bg-myYellow",
    completed:"bg-myGreen",
    abandoned:"bg-myRed",
    retired:"bg-myBlue",
  }

  const currentColor = colors[statusManager.status]

  useEffect(()=>
  {
    if(currentStatus==="none")return

    if(currentStatus==="playing")
    { 
      setStatusManager(prev=>{return {...prev,playing:true}})
      return
    }
    setStatusManager(prev=>{return {...prev,status:currentStatus,active:true}} )
  },[currentStatus])

  useEffect(()=>
  {
    if(!active&&!playing)
    {
      return setConfig(prev=>{return{...prev,values:{...prev.values,status:"none"} }})
    }

    const finalStatus = playing ? "playing": status
    setConfig(prev=>{return{...prev,values:{...prev.values,status:finalStatus}}})

  },[statusManager])


  const styles = active&&(!playing)
    ? {
        container: `${currentColor} text-[#fff]`,
        button: "",
        button1: "text-[#fff]",
      }
    : {
        container: "bg-field text-text4",
        button: "hover:bg-field brightness-[150%] mob1:brightness-[150%] mob1:brightness-[150%] mob1:bg-field",
        button1: "text-text3",
      };

  const playingStyle = playing? {button:"bg-myPink text-[#fff]",icon:"text-[#fff]"} :{button:"bg-field text-text3",icon:"text-text4"} 

  return (
    <div {...props} className={twMerge('flex flex-col mob:flex-row items-center gap-[.5rem] mob1:h-[24px] mob1:items-stretch mob:mb-[1rem]',className)} >
      <div
        className={`flex relative mt-[1rem] mob:mt-0 rounded-[.3rem] w-full mob:flex-1 mob1:min-w-[112.48px] ${styles.container}`}
      >
        {show && (
          <div
            ref={ref}
            className="w-full bg-border2 absolute left-0 top-[115%] rounded-[.3rem] flex flex-col border-field border-[1px] z-[99999]"
          >
            <StatusOption
              status="played"
              setStatusManager={setStatusManager}
              statusManager={statusManager}
              color="bg-myPink"
            >
              Played
            </StatusOption>
            <StatusOption
              status="completed"
              setStatusManager={setStatusManager}
              statusManager={statusManager}
              color="bg-myGreen"
            >
              Completed
            </StatusOption>
            <StatusOption
              status="retired"
              setStatusManager={setStatusManager}
              statusManager={statusManager}
              color="bg-myBlue"
            >
              Retired
            </StatusOption>
            <StatusOption
              status="shelved"
              setStatusManager={setStatusManager}
              statusManager={statusManager}
              color="bg-myYellow"
            >
              Shelved
            </StatusOption>
            <StatusOption
              status="abandoned"
              setStatusManager={setStatusManager}
              statusManager={statusManager}
              color="bg-myRed"
            >
              Abandoned
            </StatusOption>
          </div>
        )}
        <button
          type="button"
          onClick={() =>
            setStatusManager((prev) => {
              return { ...prev, show: !prev.show };
            })
          }
          className={`border-r-[1px] border-[#363c4b] px-[.3rem] mob:px-[.5rem] ${styles.button} rounded-[.2rem_0_0_.2rem] mob1:text-[12px]`}
        >
          <FontAwesomeIcon icon={faChevronDown} size="xs" />
        </button>
        <button
          type="button"
          className="flex-1 flex gap-[.2rem] px-[.4rem] mob1:px-[.2rem] rounded-[0_.2rem_.2rem_0] items-center justify-center"
          onClick={() =>
            setStatusManager((prev) => {
              return { ...prev, active: !active, playing: false };
            })
          }
        >
          <div className='mob1:text-[12px]'>
            <FontAwesomeIcon icon={faGamepad} />
          </div>
          <span className={`${styles.button1} text-[14px] mob1:text-[12px] capitalize`}>
            {status}
          </span>
        </button>
      </div>
      <button
        onClick={() =>
          setStatusManager((prev) => ({
            ...prev,
            playing: !prev.playing,
            active: false,
          }))
        }
        className={`flex rounded-[.3rem] ${playingStyle.button} justify-center items-center gap-[.2rem] w-full mob:flex-1`}
      >
        <div className={`${playingStyle.icon} mob1:text-[12px]`}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
        <span className="text-[14px] mob1:text-[12px]">Playing</span>
      </button>
    </div>
  );
}

