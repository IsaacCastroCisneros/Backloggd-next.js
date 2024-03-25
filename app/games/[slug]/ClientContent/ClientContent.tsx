"use client"

import React from 'react'
import GradientBanner from './components/GradientBanner'
import RiteContainer from './components/RiteContainer/RiteContainer'
import gameFinalData from '../interfaces/gameFinalData'
import LeftContainer from './components/LeftContainer/LeftContainer'

interface values {
  gameFinalData: gameFinalData;
  gameDbData: gameDbData;
}


export const context = React.createContext<values>(
  {
    gameFinalData:
    {
      id:"",
      name:"",
      summary:"",
      cover:"",
      platforms:[],
      genres:[],
      screenshot:"",
      date:"",
      publisher:"",
      developer:"",
    },
    gameDbData:
    {
      playing:0,
      plays:0,
      listed:0
    }
  })


export default function ClientContent({gameFinalData,gameDbData}:values) 
{

  return (
    <context.Provider value={{gameFinalData,gameDbData}}>
    <GradientBanner screenshot={gameFinalData.screenshot} />
      <div className='flex mt-[21rem]'>
         <LeftContainer/>
         <RiteContainer {...gameFinalData} />
      </div>
    </context.Provider>
  )
}
