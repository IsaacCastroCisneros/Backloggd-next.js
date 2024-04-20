import CardPic from '@/components/CardPic/CardPic'
import React, { useContext } from 'react'
import { context } from '../../ClientContent';

export default function HeaderMobile() 
{
  const{gameFinalData}=useContext(context)

  return (
    <div className="mt-[15px]">
      <CardPic width={165} height={223} src={gameFinalData.cover} />
    </div>
  );
}
