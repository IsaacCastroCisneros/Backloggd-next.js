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
import { useQuery, useQueryClient } from 'react-query'

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
  const[game,setGame]=useState<string>("")
  const[isFetching,setIsFetching]=useState<boolean>(false)
  const {data} = useQuery(["search",game],myRequest)
  const queryClient = useQueryClient()

  async function myRequest({signal}:any)
  {
    if(isFetching)
    {
      queryClient.cancelQueries(game)
    }
    setIsFetching(true)
    if(game==="")return []
    const response =await fetch(`/api/igdb/${game}`,{signal})
    setIsFetching(false)
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
    if(data?.length===0)
    {
      return setFinalResults({status:false,results:[],noResults:true})
    }
    setFinalResults({status:true,results:data||[],noResults:false}) 
  },[data])

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
