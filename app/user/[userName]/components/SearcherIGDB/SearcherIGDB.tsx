"use client"
import InputSearcher from '@/components/InputSearcher'
import React from 'react'
import Option from './components/Option'
import favorite from '../../edit/ClientContent/interfaces/favorite'
import cardPosition from '../../../../../types/favoritePosition'
import useSearchIGDB from '@/hooks/useSearchIGDB'

interface props
{
  updateFavorites:(newFavorite:favorite)=>void
  pos:cardPosition
}

export default function SearcherIGDB({updateFavorites,pos}:props) 
{
  const{handleSearch,loadingIcon,finalResults,data,game}=useSearchIGDB()

  const{status,results}=finalResults

  return (
    <div className="relative z-[999]">
      <InputSearcher
        icon={loadingIcon}
        onChange={handleSearch}
        status={status}
        focusOnStar
      >
        {results.map((res, index) => (
          <Option
            key={index}
            pos={pos}
            {...res}
            updateFavorites={updateFavorites}
          />
        ))}
      </InputSearcher>
      {data?.length === 0 && game !== "" && (
        <span className="absolute text-[#fff] text-[2rem] bottom-0 translate-y-[100%] left-[50%] translate-x-[-50%] mob:text-[.8rem] z-[99]">
          There is no results
        </span>
      )}
    </div>
  );
}
