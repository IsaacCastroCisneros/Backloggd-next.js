import React, { useContext } from 'react'
import { context } from '../../../../ClientContent';

export default function Reviews() 
{
  const {gameFinalData}=useContext(context)


  return (
    <>
      <h2 className="text-[1.3rem] text-text">Reviews</h2>
    </>
  );
}
