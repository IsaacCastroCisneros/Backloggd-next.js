import list from '@/interfaces/list'
import user from '@/interfaces/user'
import React, { FormEvent } from 'react'
import { useQuery } from 'react-query'
import getList from './server/getList'
import insertGameAndList from '@/server/insertGameAndList'

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
     const data=Object.fromEntries(formData)

     /* await insertGameAndList({userId:user.id,list:[{id:gameId}],listIdFromDb:"154"}) */
  }

  return (
    <div className="bg-border2 w-[400px] p-[16px]">
      <span className="text-[1.25rem] font-bold text-[#fff]">
        Select lists to add this game to
      </span>
      <form onSubmit={submit}>
        {!isFetching &&
          data.map((list:list) =>
          (
            <input key={list.id} type="checkbox" name={list.name} value={list.id} />
          ))}
          <button className='bg-[#fff]'>
            go
          </button>
      </form>
    </div>
  );
}
