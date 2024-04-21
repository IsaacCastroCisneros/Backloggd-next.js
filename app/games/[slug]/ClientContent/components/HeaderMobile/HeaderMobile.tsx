import CardPic from '@/components/CardPic/CardPic'
import React, { useContext } from 'react'
import { context } from '../../ClientContent';
import HeaderInformation from '../HeaderInformation/HeaderInformation';

export default function HeaderMobile() 
{
  const{gameFinalData}=useContext(context)

  const{date,publisher,developer,name}=gameFinalData

  return (
    <div className="mt-[50px] hidden mob:flex">
      <CardPic className='min-h-[120px]' width={165} height={223} src={gameFinalData.cover} />
      <section className='ml-[1.6rem]'>
        <HeaderInformation
          date={date}
          publisher={publisher}
          developer={developer}
          name={name}
        />
      </section>
    </div>
  );
}
