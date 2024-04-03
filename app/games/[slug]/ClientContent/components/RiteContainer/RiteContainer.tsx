import React from 'react'
import gameFinalData from '../../../interfaces/gameFinalData';
import Header from './components/Header/Header';
import Reviews from './components/Reviews/Reviews';

interface props extends gameFinalData
{

}

export default function RiteContainer(props:props) 
{
   

  return (
    <div className='pl-[3.5rem] flex-1'>
      <Header/>
      <Reviews/>
    </div>
  )
}

