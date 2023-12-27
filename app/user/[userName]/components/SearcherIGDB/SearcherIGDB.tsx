"use client"
import InputSearcher from '@/components/InputSearcher'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Option from './components/Option'
import favorite from '../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../edit/ClientContent/types/cardPosition'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import gameCardData from '@/interfaces/gameCardData'
import { IconDefinition, faCircleNotch, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface finalResults
{
  results:Array<gameCardData>
  status:"isLoading"|boolean
}
interface props
{
  updateFavorites:(newFavorite:favorite)=>void
  pos:cardPosition
}

export default function SearcherIGDB({updateFavorites,pos}:props) 
{
  const[finalResults,setFinalResults]=useState<finalResults>({status:false,results:[]})
  const[isSearching,setIsSearching]=useState<any>(null)

  
  async function handleSearch(e:ChangeEvent<HTMLInputElement>)
  {
    if(isSearching)clearTimeout(isSearching)
 
    const game=e.target.value
    if(game==="")return

    const searching=setTimeout(async()=>
    {
      setFinalResults({ results:[], status: "isLoading" })
      const results=await getFullGameIGDB({game})
      setFinalResults({status:true,results}) 
    },350)
    setIsSearching(searching)
  }

  useEffect(()=>
  {
    return ()=>
    {
      if(isSearching)clearTimeout(isSearching)
    }
  },[isSearching])

  const{status,results}=finalResults
  console.log(results)

  const loadingIcon:FontAwesomeIconProps= status==="isLoading" ? {icon:faSpinner,spin:true} :{icon:faMagnifyingGlass,spin:false} 

  return (
    <div className="relative z-[999]">
      <InputSearcher
        onChange={handleSearch}
        icon={loadingIcon}
    /*     onBlur={() => setFinalResults((prev) => ({ ...prev, status: false }))} */
      />
      {
        <div
          className={`flex-col absolute top-[100%] left-0 max-h-[25rem] overflow-y-auto w-full rounded-[0px_0px_.3rem_.3rem] ${
            status===true ? "flex" : "hidden"
          }`}
        >
          {results.map((res, index) => (
            <Option
              key={index}
              pos={pos}
              {...res}
              updateFavorites={updateFavorites}
            />
          ))}
        </div>
      }
    
    </div>
  );
}
