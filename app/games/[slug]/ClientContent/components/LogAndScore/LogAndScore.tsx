import { global } from '@/app/context/GlobalContext'
import Button from '@/components/Button'
import LogForm from '@/components/LogForm/LogForm'
import user from '@/interfaces/user'
import { useSession } from 'next-auth/react'
import React, { HtmlHTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { context } from '../../ClientContent'
import LoginForLogLink from '@/components/LoginForLogLink'
import CardPic from '@/components/CardPic'
import Score from '@/components/Score/Score'
import ButtonLog from '../LeftContainer/components/ButtonLog'
import { faGamepad, faPlay } from '@fortawesome/free-solid-svg-icons'
import useLogButtons from '@/hooks/useLogButtons/useLogButtons'

interface props extends HtmlHTMLAttributes<HTMLElement>
{
  
}


export default function LogAndScore({className,...props}:props) 
{
  const{setPopup}=useContext(global)
  const{gameFinalData,logGameData}=useContext(context)
  const data = useSession().data
  const user = data ? data.user as user : null 

  const{cover,id,name,dateYear,slug}=gameFinalData
  const{score,platformsIGDB}=logGameData

  const {statusUpdate,hightLigth}=useLogButtons({game_id:id,user_id:user?.id||""})


  return (
    <div
      {...props}
      className={twMerge(
        "relative w-full flex flex-col items-center rounded-[.3rem] p-[.8rem] bg-border2",
        className
      )}
    >
      {user && (
        <Button
          className="capitalize w-full mb-[.5rem]"
          onClick={() =>
            setPopup({
              show: true,
              content: (
                <LogForm
                  slug={slug}
                  user={user}
                  cover={cover}
                  platforms={platformsIGDB}
                  state="byPlatforms"
                  id={id}
                  name={name}
                  date={Number(dateYear)}
                />
              ),
              clickOutside: false,
            })
          }
        >
          edit your log
        </Button>
      )}
      {!user && <LoginForLogLink />}
      <div className="absolute flex w-full justify-center translate-y-[-88%] top-0 mob:hidden">
        <CardPic src={cover} width={165} height={223} />
      </div>
      {user && (
        <Score size="bigger" id={`${id}`} user={user} initialScore={score} />
      )}
      {user && (
        <>
          <p className="border-b-[1px] border-border4 block w-full my-[.6rem]"></p>
          <div className="flex w-full justify-evenly">
            <ButtonLog
              icon={faGamepad}
              label="played"
              isActive={"played" === hightLigth}
              onClick={() => statusUpdate("played")}
            />
            <ButtonLog
              icon={faPlay}
              label="Playing"
              isActive={"playing" === hightLigth}
              onClick={() => statusUpdate("playing")}
            />
          </div>
        </>
      )}
    </div>
  );
}
