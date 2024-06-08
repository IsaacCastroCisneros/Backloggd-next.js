import InputSearcher from '@/components/InputSearcher'
import InputSearcherOption from '@/components/InputSearcherOption'
import useSearchIGDB from '@/hooks/useSearchIGDB'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import listItem from '../interfaces/listItem'
import useClickOutside from '@/hooks/useClickOutside'
import { v4 as uuidv4 } from 'uuid'

interface props
{
   setList:Dispatch<SetStateAction<Array<listItem>>>
   list:Array<listItem>
}

export default function Searcher({setList,list}:props) 
{
  const{handleSearch,finalResults,loadingIcon}=useSearchIGDB()
  const[show,setShow]=useState<boolean>(false)
  const{results,status}=finalResults
  
  const {ref} = useClickOutside(()=>
  {
    setShow(false)
  })

  useEffect(()=>
  {
     setShow(false)
  },[list])


  return (
    <div ref={ref}>
      <InputSearcher
        onFocus={()=>setShow(true)}
        onChange={handleSearch}
        status={status}
        icon={loadingIcon}
      >
        {show &&
          results.map((res) => (
            <InputSearcherOption
              key={res.id}
              label={res.name}
              date={res.date}
              onClick={() =>
                setList((prev) => [
                  ...prev,
                  { name: res.name, cover: res.cover, id: res.id,listId:uuidv4()},
                ])
              }
            />
          ))}
      </InputSearcher>
    </div>
  );
}
