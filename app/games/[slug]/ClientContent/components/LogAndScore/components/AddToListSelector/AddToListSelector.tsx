import list from '@/interfaces/list'
import user from '@/interfaces/user'
import React, { FormEvent } from 'react'
import { useQuery } from 'react-query'
import getList from '../server/getList'
import insertGameAndList from '@/server/insertGameAndList'
import Button from '@/components/Button'
import LIstOption from './components/LIstOption'

interface props
{
  user:user
  gameId:string
}

export default function AddToListSelector({user,gameId}:props) 
{
  const{data,isFetching}=useQuery(["list",user.id],request)

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

     const requestArr=data.map(async(listId)=>
    {
      const id = listId as string
      await insertGameAndList({userId:user.id,list:[{id:gameId}],listIdFromDb:id})
    })

    await Promise.all(requestArr)
  }

  return (
    <div className="bg-border2 w-[400px] p-[16px] rounded-[.4rem]">
      <span className="text-[1.25rem] font-bold text-[#fff]">
        Select lists to add this game to
      </span>
      <form onSubmit={submit}>
        <ul className='flex flex-col'>
          {!isFetching &&
            data.map((list:list) => (
              
                <LIstOption key={list.id} {...list} />
            ))}
        </ul>
        <Button>Add to List</Button>
      </form>
    </div>
  );
}
