import React from 'react'
import gameFinalData from '../../../interfaces/gameFinalData';
import Header from './components/Header/Header';

interface props extends gameFinalData
{

}

export default function RiteContainer(props:props) 
{

  return (
    <Header/>
  )
}

