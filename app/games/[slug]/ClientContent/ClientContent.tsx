"use client"

import React from 'react'
import GradientBanner from './components/GradientBanner'
import RiteContainer from './components/RiteContainer/RiteContainer'
import gameFinalData from '../interfaces/gameFinalData'
import LeftContainer from './components/LeftContainer'

export const context = React.createContext<{gameFinalData:gameFinalData}>(
  {
    gameFinalData:
    {
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
      <div className='flex'>
         <LeftContainer/>
         <RiteContainer {...gameFinalData} />
      </div>
    </context.Provider>
  )
}
