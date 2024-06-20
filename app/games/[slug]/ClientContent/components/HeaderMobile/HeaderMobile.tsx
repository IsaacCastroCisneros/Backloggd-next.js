import CardPic from '@/components/CardPic'
import React, { useContext } from 'react'
import { context } from '../../ClientContent';
import HeaderInformation from '../HeaderInformation/HeaderInformation';
import LogAndScore from '../LogAndScore/LogAndScore';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import Item from './components/Item';
import Separator from '@/components/Separator';

export default function HeaderMobile() 
{
  const{gameFinalData,gameDbData}=useContext(context)

  const{date,publisher,developer,name}=gameFinalData
  const{playing,plays,listed}=gameDbData

  return (
    <div className="mt-[50px] hidden mob:block">
      <div className="flex mb-[1rem]">
        <CardPic
          className="min-h-[120px]"
          width={165}
          height={223}
          src={gameFinalData.cover}
        />
        <section className="ml-[1.6rem]">
          <HeaderInformation
            date={date}
            publisher={publisher}
            developer={developer}
            name={name}
          />
        </section>
      </div>
      <div className="flex gap-[.3rem] items-start">
        <LogAndScore className="max-w-[198px]" />
        <Button className='bg-[transparent] border-field border-[1px] text-text2'>
          <FontAwesomeIcon icon={faLayerGroup} />
          <span className='ml-[.5rem] inline-block'>
          Add to a List
          </span>
        </Button>
      </div>
      <Separator className='my-[.8rem] w-full'/>
      <ul className='flex justify-around mb-[2rem]'>
        <Item number={plays} label='Plays' />
        <Item number={playing} label='Playing' />
        <Item number={listed} label='lists' />
      </ul>
    </div>
  );
}
