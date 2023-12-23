"use client"
import InputSearcher from '@/components/InputSearcher'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Option from './components/Option'
import result from './interfaces/result'
import favorite from '../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../edit/ClientContent/types/cardPosition'
import igdb from '@/util/igdb'
import getCoverDate from '@/util/getCoverDate'

interface finalResults
{
  results:Array<result>
  show:boolean
}
interface props
{
  updateFavorites:(newFavorite:favorite)=>void
  pos:cardPosition
}

export default function SearcherIGDB({updateFavorites,pos}:props) 
{
  const[finalResults,setFinalResults]=useState<finalResults>({show:false,results:[]})
  const[isSearching,setIsSearching]=useState<any>(null)

  function handleSearch(e:ChangeEvent<HTMLInputElement>)
  {
    if(isSearching)clearTimeout(isSearching)
 
    const param=e.target.value
    if(param==="")return

    const searching=setTimeout(async()=>
    {
      const{res}=await igdb({type:"games",query:`search "${param}"; fields name, cover, release_dates; limit 25;`})

      const{coversIds,dateIds}=getCoverDate({games:res})

      const {res:covers} = await igdb({type:"covers",query:`where id=(${coversIds}); fields url,game;`})
      const {res:dates} = await igdb({type:"release_dates",query:`where id=(${dateIds}); fields y,game;`})
      
      const results= res as Array<result>

      setFinalResults({show:true,results}) 
    },800)
    setIsSearching(searching)
  }

  useEffect(()=>
  {
    return ()=>
    {
      if(isSearching)clearTimeout(isSearching)
    }
  },[])

  const{show,results}=finalResults

  return (
    <div className="relative z-[999]">
      <InputSearcher onChange={handleSearch} onBlur={()=>setFinalResults(prev=>({...prev,show:false}))}/>
      {(
        <div className="flex flex-col absolute top-[100%] left-0 max-h-[25rem] overflow-y-auto w-full rounded-[0px_0px_.3rem_.3rem]">
          {results.map((res, index) => (
            <Option key={index} pos={pos} {...res} updateFavorites={updateFavorites} />
          ))}
        </div>
      )}
    </div>
  );
}
