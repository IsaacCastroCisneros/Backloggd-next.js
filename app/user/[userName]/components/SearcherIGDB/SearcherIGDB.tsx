"use client"
import InputSearcher from '@/components/InputSearcher'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Option from './components/Option'
import favorite from '../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../../../../types/favoritePosition'
import gameCardData from '@/interfaces/gameCardData'
import {faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { useQuery, useQueryClient } from 'react-query'

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
  const[game,setGame]=useState<string>("")
  const {data} = useQuery(["search",game],myRequest)
  const queryClient = useQueryClient()

  const{status,results}=finalResults

  async function myRequest({signal}:any)
  {
    if(status==="isLoading")
    {
      queryClient.cancelQueries(game)
    }
    setFinalResults(prev=>({...prev,status:"isLoading"}))
    const response =await fetch(`/api/igdb/${game}`,{signal})
    setFinalResults(prev=>({...prev,status:true}))
    const {res} = await response.json()
    
    return res
  }

  async function handleSearch(e:ChangeEvent<HTMLInputElement>)
  {
    const game=e.target.value
    if(game==="")return
    setGame(game)
  }

  useEffect(()=>
  { 
    setFinalResults({status:true,results:data||[]}) 
  },[data])

  const loadingIcon:FontAwesomeIconProps= status==="isLoading" ? {icon:faSpinner,spin:true} :{icon:faMagnifyingGlass,spin:false} 

  return (
    <div className="relative z-[999]">
      <InputSearcher
        onChange={handleSearch}
        icon={loadingIcon}
        focusOnStar
      />
      <div
        className={`flex-col absolute top-[100%] left-0 max-h-[25rem] overflow-y-auto w-full rounded-[0px_0px_.3rem_.3rem] z-[999] ${
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
      {data?.length===0 && game!==""&&(
        <span className="absolute text-[#fff] text-[2rem] bottom-0 translate-y-[100%] left-[50%] translate-x-[-50%] mob:text-[.8rem] z-[99]">
          There is no results
        </span>
      )}
    </div>
  );
}
