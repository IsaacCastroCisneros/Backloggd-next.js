import { faEllipsisH, faGamepad, faPlay } from '@fortawesome/free-solid-svg-icons'
import React, { HtmlHTMLAttributes, useContext } from 'react'
import Button from './components/Button/Button';
import { gameCard } from '../../GameCard';
import gameCardData from '@/interfaces/gameCardData';
import { twMerge } from 'tailwind-merge';
import useLogButtons from '@/hooks/useLogButtons/useLogButtons';

interface props extends HtmlHTMLAttributes<HTMLDivElement>
{
  
}

export default function Menu(props:props) 
{
  const{gameCardData,user,isMenuSmall}=useContext(gameCard)
  const{id:game_id,slug}=gameCardData as gameCardData || {id:""}
  const{id:user_id}=user || {id:""}
  const{hightLigth,statusUpdate}=useLogButtons({game_id,user_id})

  return (
    <div
      {...props}
      className={twMerge(
        `rounded-[5px] bg-border2 border-gray border-[1px] ${
          isMenuSmall ? "px-[.5rem]" : "px-[1rem]"
        } flex justify-between gap-[.5rem] z-[9] mob:hidden`,
        props.className
      )}
    >
      <Button
        isActive={"played" === hightLigth}
        label="Played"
        icon={faGamepad}
        onClick={() => statusUpdate("played",slug)}
      />
      <Button
        isActive={"playing" === hightLigth}
        label="Playing"
        icon={faPlay}
        onClick={() => statusUpdate("playing",slug)}
      />
      <Button isActive={false} label="more" icon={faEllipsisH} isMenu />
    </div>
  );
}



