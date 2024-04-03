"use client"

import React from 'react'
import GradientBanner from './components/GradientBanner'
import RiteContainer from './components/RiteContainer/RiteContainer'
import gameFinalData from '../interfaces/gameFinalData'
import LeftContainer from './components/LeftContainer/LeftContainer'
import logGameData from '@/interfaces/logGameData'

interface values {
  gameFinalData: gameFinalData;
  gameDbData: gameDbData;
  logGameData:logGameData|null
}


export const context = React.createContext<values>({
  gameFinalData: {
    id: "",
    name: "",
    summary: "",
    cover: "",
    platforms: [],
    genres: [],
    screenshot: "",
    date: "",
    dateYear:"",
    publisher: "",
    developer: "",
    slug:""
  },
  gameDbData: {
    playing: 0,
    plays: 0,
    listed: 0,
  },
  logGameData: {
    status: "none",
    review: "",
    platform: "0",
    score: 0,
    platformsIGDB:[]
  },
});


export default function ClientContent({gameFinalData,gameDbData,logGameData}:values) 
{

  return (
    <context.Provider value={{gameFinalData,gameDbData,logGameData}}>
    <GradientBanner screenshot={gameFinalData.screenshot} />
      <div className='flex mt-[21rem]'>
         <LeftContainer/>
         <RiteContainer {...gameFinalData} />
      </div>
    </context.Provider>
  )
}
