"use client"

import React, { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from 'react'
import Star from './components/Star'
import score from '../../types/score'
import user from '@/interfaces/user'
import gameLogin from '@/server/gameLogin'
import config from '../../interfaces/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import size from './types/size'
import { global } from '@/app/context/GlobalContext'

interface props 
{
  size:size 
  user:user|null
  initialScore:score
  id:string
  setConfig?:Dispatch<SetStateAction<config>>
}

export default function Score(props:props) 
{
  const{size,user,id,setConfig,initialScore}=props
  const[score,setScore]=useState<score>(0)
  const[highligth,setHighligth]=useState<score>(0)
  const{setMsg}=useContext(global)

  
  useEffect(()=>
  {
    setHighligth(initialScore)
  },[initialScore])

  function handleToDefault()
  {
    setHighligth(0)
  }
    
  if (user === null) return null;
  
  const submittingForm =async(e:FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();
    if (setConfig) {
      return setConfig((prev) => {
        return { ...prev, values: { ...prev.values, score } };
      });
    }

    await gameLogin({ score, user_id: user.id, game_id: id });
    setMsg({msg:"Log Updated",type:"success",show:true})

  }

  return (
    <form
      className='w-fit'
      onSubmit={submittingForm}
    >
      <div className="flex text-gray w-fit justify-center relative items-center">
        <button
          className=" text-text hover:text-myPink absolute left-0 translate-x-[-100%] top-[50%] translate-y-[-50%]"
          onClick={handleToDefault}
        >
          <FontAwesomeIcon icon={faXmark} size='sm' />
        </button>
        <Star
          myScore={[1, 2]}
          size={size}
          setScore={setScore}
          score={score}
          highligth={highligth}
          setHighligth={setHighligth}
        />
        <Star
          myScore={[3, 4]}
          size={size}
          setScore={setScore}
          score={score}
          highligth={highligth}
          setHighligth={setHighligth}
        />
        <Star
          myScore={[5, 6]}
          size={size}
          setScore={setScore}
          score={score}
          highligth={highligth}
          setHighligth={setHighligth}
        />
        <Star
          myScore={[7, 8]}
          size={size}
          setScore={setScore}
          score={score}
          highligth={highligth}
          setHighligth={setHighligth}
        />
        <Star
          myScore={[9, 10]}
          size={size}
          setScore={setScore}
          score={score}
          highligth={highligth}
          setHighligth={setHighligth}
        />
      </div>
    </form>
  );
}
