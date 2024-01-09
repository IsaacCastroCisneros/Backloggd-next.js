"use client"
import InputSearcher from '@/components/InputSearcher'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Option from './components/Option'
import favorite from '../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../../../../types/favoritePosition'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import gameCardData from '@/interfaces/gameCardData'
import {faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface finalResults
{
  results:Array<gameCardData>
  status:"isLoading"|boolean
  noResults?:boolean
}
interface props
{
  updateFavorites:(newFavorite:favorite)=>void
  pos:cardPosition
}

export default function SearcherIGDB({updateFavorites,pos}:props) 
{
  const[finalResults,setFinalResults]=useState<finalResults>({status:false,results:[],noResults:false})
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
      if(results.length===0)
      {
        return setFinalResults({status:false,results:[],noResults:true})
      }
      setFinalResults({status:true,results,noResults:false}) 
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

  const{status,results,noResults}=finalResults

  const loadingIcon:FontAwesomeIconProps= status==="isLoading" ? {icon:faSpinner,spin:true} :{icon:faMagnifyingGlass,spin:false} 

  return (
    <div className="relative z-[999]">
      <InputSearcher
        onChange={handleSearch}
        icon={loadingIcon}
        focusOnStar
      />
      <div
        className={`flex-col absolute top-[100%] left-0 max-h-[25rem] overflow-y-auto w-full rounded-[0px_0px_.3rem_.3rem] ${
          status === true ? "flex" : "hidden"
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
      {noResults && (
        <span className="absolute text-[#fff] text-[2rem] bottom-0 translate-y-[100%] left-[50%] translate-x-[-50%] mob:text-[.8rem]">
          There is no results
        </span>
      )}
    </div>
  );
}
