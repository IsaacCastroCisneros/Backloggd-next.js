"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Star from './components/Star'
import score from './interfaces/score'
import user from '@/interfaces/user'
import getScore from './server/getScore'
import gameLogin from '@/server/gameLogin'
import config from '../LogForm/interfaces/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface props 
{
  size:"big"|"normal" 
  user:user|null
  id:string
  setConfig?:Dispatch<SetStateAction<config>>
}

export default function Score(props:props) 
{
  const{size,user,id,setConfig}=props
  const[score,setScore]=useState<score>(0)
  const[highligth,setHighligth]=useState<score>(0)
  
  useEffect(()=>
  {
    async function request()
     {
       if(user===null)return
       const {res,err} = await getScore(id,user.id)
       if(err||res.length===0)return
       setHighligth(res[0].score)
      }
      
      request()
  },[])

  function handleToDefault()
  {
    setHighligth(0)
  }
    
  if (user === null) return null;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (setConfig) {
          return setConfig((prev) => {
            return { ...prev, values: { ...prev.values, score } };
          });
        }

        await gameLogin({ score, user_id: user.id, game_id: id });
      }}
    >
      <div className="flex text-gray w-fit justify-center relative items-center">
        <button
          className=" text-text hover:text-myPink"
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
