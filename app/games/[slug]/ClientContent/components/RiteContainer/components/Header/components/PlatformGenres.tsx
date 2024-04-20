import { context } from '@/app/games/[slug]/ClientContent/ClientContent'
import React, { useContext } from 'react'
import Platform from './components/Platform'
import Block from './components/Block'
import Genre from './components/Genre'

export default function PlatformGenres() 
{
  const{gameFinalData}=useContext(context)
  const{platforms,genres}=gameFinalData
  

  return (
    <div className="flex flex-col gap-[.5rem] mob:gap-[.8rem]">
      <Block title="Released on">
        {platforms.map((platform, key) => (
          <Platform key={key} label={platform} />
        ))}
      </Block>
      <Block title='Genres'>
        {genres.map((genre, key) => (
         <Genre key={key} label={genre} />
        ))}
      </Block>
    </div>
  );
}
