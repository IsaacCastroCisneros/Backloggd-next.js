import React from 'react'
import gameFinalData from '../interfaces/gameFinalData';

interface props extends gameFinalData
{

}

export default function RiteContainer({name}:props) 
{

  return (
    <div className="mt-[21rem]">
      <h1 className="text-[2.5rem] text-[#fff] font-bold">{name}</h1>
      <p className="text-text7 text-[20px]">released on</p>
    </div>
  );
}
