import React, { FormEvent, useContext } from 'react'
import deleteList from './server/deleteList'
import props from '../interfaces/props'
import Button from '@/components/Button'
import { global } from '@/app/context/GlobalContext'
import {useRouter} from 'next/navigation'

export default function AreYouSure({listId,user}:props) 
{
   const{setMsg,setPopup,setloadSpinner}=useContext(global)
   const router = useRouter()


   function handleClosePopup()
   {
     setPopup(prev=>({...prev,show:false}))
   }

   async function deletingList(e:FormEvent<HTMLFormElement>)
   {
     e.preventDefault()
     setloadSpinner(true)
     await deleteList({listId,user})
     setloadSpinner(false)

     handleClosePopup()
     setMsg({type:"success",show:true,msg:"The list was deleted"})
     
     router.push(`/user/${user?.username}/lists`)
     router.refresh()
   }

  return (
    <div className='bg-border2 py-[2rem] px-[2rem] rounded-[.5rem]'>
       <span className='text-[#fff] text-[2rem] font-medium mb-[3rem] block mob0:text-[1.5rem] text-center mob0:mb-[1.5rem]'>
         Are you sure about delete this list?
       </span>
      <form onSubmit={deletingList} className='flex w-full gap-[4rem] justify-center'>
        <Button className='px-[1.5rem]'>
          Yes
        </Button>
        <button onClick={handleClosePopup} type='button' className='text-text hover:text-text4 hover:underline'>
          Cancel
        </button>
      </form>
    </div>
  )
}
