"use client"

import React from 'react'
import GradientBanner from './components/GradientBanner'
import RiteContainer from './components/RiteContainer/RiteContainer'
import gameFinalData from '../interfaces/gameFinalData'
import LeftContainer from './components/LeftContainer/LeftContainer'
import logGameData from '@/interfaces/logGameData'
import review from '../interfaces/review'
import HeaderMobile from './components/HeaderMobile/HeaderMobile'

interface values {
  gameFinalData: gameFinalData;
  gameDbData: gameDbData;
  logGameData:logGameData
  reviews:Array<review>
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
    platformsIGDB:[],
  },
  reviews:[]
});


export default function ClientContent(props:values) 
{
  const { gameFinalData, gameDbData, logGameData, reviews } = props;

  return (
    <context.Provider
      value={{ gameFinalData, gameDbData, logGameData, reviews }}
    >
      <GradientBanner screenshot={gameFinalData.screenshot} />
      <HeaderMobile/>
      <div className="flex mt-[21rem] mob:mt-0">
        <LeftContainer />
        <RiteContainer {...gameFinalData} />
      </div>
    </context.Provider>
  );
}
