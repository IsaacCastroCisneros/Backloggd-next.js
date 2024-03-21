"use client"
import React, { useContext } from 'react'
import { context } from '../../ClientContent'
import CardPic from '@/components/CardPic/CardPic'
import Score from '@/components/Score/Score'
import { useSession } from 'next-auth/react'
import user from '@/interfaces/user'
import Button from '@/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faPlay, faStar } from '@fortawesome/free-solid-svg-icons'
import ButtonLog from './components/ButtonLog'


export default function LeftContainer() 
{
  const{gameFinalData}=useContext(context)
  const {data} = useSession()
  const{cover,id}=gameFinalData

  return (
    <div className="w-[198px] flex flex-col">
      <div className="bg-border2 relative w-full mt-[4rem] rounded-[.3rem] p-[.8rem] flex flex-col items-center pt-[2.5rem]">
        <Button className='capitalize w-full mb-[.5rem]'>
          edit your log
        </Button>
        <CardPic
          className="absolute top-[0] translate-y-[-88%] translate-x-[-50%] left-[50%]"
          src={cover}
          width={165}
          height={223}
        />
        {data?.user && (
          <Score size="bigger" id={`${id}`} user={data.user as user} />
        )}
        <p className='border-b-[1px] border-border4 block w-full my-[.6rem]'></p>
        <div className='flex w-full justify-evenly'>
           <ButtonLog icon={faGamepad} label='played'/>
           <ButtonLog icon={faPlay} label='Playing'/>
        </div>
      </div>
    </div>
  );
}
