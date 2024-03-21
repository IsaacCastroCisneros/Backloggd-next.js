import { faEllipsisH, faGamepad, faPlay } from '@fortawesome/free-solid-svg-icons'
import React, { HtmlHTMLAttributes, useContext, useState } from 'react'
import Button from './components/Button/Button';
import { gameCard } from '../../GameCard';
import gameLogin from '@/server/gameLogin';
import gameStatus from '@/types/gameStatus';
import gameCardData from '@/interfaces/gameCardData';
import { useQuery } from 'react-query';
import getGame from '@/server/getGame';
import { twMerge } from 'tailwind-merge';
import { global } from '@/app/context/GlobalContext';

interface props extends HtmlHTMLAttributes<HTMLDivElement>
{
  
}

export default function Menu(props:props) 
{
  const{gameCardData,user,isMenuSmall}=useContext(gameCard)
  const{setMsg}=useContext(global)
  const{id:game_id}=gameCardData as gameCardData || {id:""}
  const{id:user_id}=user || {id:""}
  useQuery(["data",{game_id,user_id}],gettingGameDataDB)
  const[hightLigth,setHightLigth]=useState<gameStatus>("none")

  async function statusUpdate(status:gameStatus) 
  { 
    const {err} = JSON.parse(await gameLogin({game_id,user_id,status})) 
    if(!err)
    {
      setHightLigth(status)
      setMsg({show:true,msg:"Updated",type:"success"})
    }
  }

  async function gettingGameDataDB({queryKey}:any)
  {
    const[_key,{game_id,user_id}]=queryKey
    const{res,err}=JSON.parse(await getGame(game_id,user_id))
    if(err)return"none" 
    setHightLigth(res[0].status) 
  }


  return (
    <div
      {...props}
      className={twMerge(`rounded-[5px] bg-border2 border-gray border-[1px] ${isMenuSmall ? "px-[.5rem]":"px-[1rem]"} flex justify-between gap-[.5rem] z-[9] mob:hidden`,props.className)} 
    >
      <Button
        isActive={"played" === hightLigth}
        label="Played"
        icon={faGamepad}
        onClick={() => statusUpdate("played")}
      />
      <Button
        isActive={"playing" === hightLigth}
        label="Playing"
        icon={faPlay}
        onClick={() => statusUpdate("playing")}
      />
      <Button isActive={false} label="more" icon={faEllipsisH} isMenu />
    </div>
  );
}



