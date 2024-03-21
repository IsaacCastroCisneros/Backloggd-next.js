"use client"

import React from 'react'
import GradientBanner from './components/GradientBanner'
import RiteContainer from './components/RiteContainer/RiteContainer'
import gameFinalData from '../interfaces/gameFinalData'
import LeftContainer from './components/LeftContainer/LeftContainer'

export const context = React.createContext<{gameFinalData:gameFinalData}>(
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
    }
  })

interface props
{
  gameFinalData:gameFinalData
}

export default function ClientContent({gameFinalData}:props) 
{

  return (
    <context.Provider value={{gameFinalData}}>
    <GradientBanner screenshot={gameFinalData.screenshot} />
      <div className='flex mt-[21rem]'>
         <LeftContainer/>
         <RiteContainer {...gameFinalData} />
      </div>
    </context.Provider>
  )
}
