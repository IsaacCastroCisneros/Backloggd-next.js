"use client"

import React from 'react'
import GradientBanner from './components/GradientBanner'
import RiteContainer from './components/RiteContainer/RiteContainer'
import gameFinalData from '../interfaces/gameFinalData'

export const context = React.createContext<{gameFinalData:gameFinalData}|null>(null)

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
         <RiteContainer {...gameFinalData} />
      </div>
    </context.Provider>
  )
}
