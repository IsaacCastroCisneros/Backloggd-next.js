import list from '@/interfaces/list'
import user from '@/interfaces/user'
import React, { FormEvent, useContext } from 'react'
import { useQuery } from 'react-query'
import getList from './server/getList'
import insertGameAndList from '@/server/insertGameAndList'
import Button from '@/components/Button'
import LIstOption from './components/LIstOption'
import Link from 'next/link'
import { global } from '@/app/context/GlobalContext'
import LoadingSpinner from '../LoadingSpinner'

interface props
{
  user:user
  gameId:string
}

export default function AddToListSelector({user,gameId}:props) 
{
  const{data,isLoading}=useQuery(["list",user.id],request,{refetchOnWindowFocus:false})
  const{setPopup,setMsg,setloadSpinner}=useContext(global)

  async function request({queryKey}:any)
  {
    const{res}=JSON.parse(await getList(queryKey[1])) 
    return res
  }


  async function submit(e:FormEvent<HTMLFormElement>)
  {
     e.preventDefault()

     const formData = new FormData(e.currentTarget)
     const data=Object.values(Object.fromEntries(formData)) 

     if(data.length===0)return setMsg({show:true,msg:"Select a list",type:"fail"})

     const requestArr=data.map(async(listId)=>
    {
      const id = listId as string
      await insertGameAndList({userId:user.id,list:[{id:gameId}],listIdFromDb:id})
    })

    setloadSpinner(true)
    await Promise.all(requestArr)
    setloadSpinner(false)

    setPopup(prev=>({...prev,show:false}))
    setMsg({show:true,msg:"Game added to list",type:"success"})
  }

  return (
    <div className="bg-border2 w-[400px] mob:w-[100%] rounded-[.4rem]">
      {
        isLoading&&!data&&<LoadingSpinner/>
      }
      {!isLoading && data.length === 0 && (
        <div className='flex flex-col justify-center p-[16px]'>
          <span className="text-[2rem] text-[#fff] font-medium text-center block mb-[1rem]">
            There are no lists yet
          </span>
          <Link
            href={`/user/${user.username}/lists`}
            
            className='font-medium text-[#fff] px-[.7rem] py-[.3rem] mx-auto rounded-[.2rem] duration-200 relative hover:brightness-[150%] bg-myPink inline-block'
            onClick={() => setPopup((prev) => ({ ...prev, show: false }))}
          >
            Create a List
          </Link>
        </div>
      )}
      {!isLoading && data.length > 0 && (
        <>
          <span className="text-[1.25rem] font-bold text-[#fff] p-[16px] block">
            Select lists to add this game to
          </span>
          <form onSubmit={submit}>
            <ul className="flex flex-col max-h-[25rem] overflow-y-auto">
              {data.map((list: list) => (
                <LIstOption key={list.id} {...list} />
              ))}
            </ul>
            <div className='px-[16px] block pt-[9px] pb-[16px]'>
            <Button className='ml-auto'>Add to List</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
