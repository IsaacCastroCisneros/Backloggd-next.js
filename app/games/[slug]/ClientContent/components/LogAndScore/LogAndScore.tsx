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
import { faChevronDown, faGamepad, faPlay } from '@fortawesome/free-solid-svg-icons'
import useLogButtons from '@/hooks/useLogButtons/useLogButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddToListSelector from '@/components/AddToListSelector/AddToListSelector'
import useMyUseSession from '@/hooks/useMyUseSession'


interface props extends HtmlHTMLAttributes<HTMLElement>
{
  
}


export default function LogAndScore({className,...props}:props) 
{
  const{setPopup}=useContext(global)
  const{gameFinalData,logGameData}=useContext(context)
  const user = useMyUseSession()

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
        <Score
          size="bigger"
          id={`${id}`}
          slug={slug}
          user={user}
          initialScore={score}
        />
      )}
      {user && (
        <>
          <p className="border-b-[1px] border-border4 block w-full my-[.6rem]"></p>
          <div className="flex w-full justify-evenly">
            <ButtonLog
              icon={faGamepad}
              label="played"
              isActive={"played" === hightLigth}
              onClick={() => statusUpdate("played", slug)}
            />
            <ButtonLog
              icon={faPlay}
              label="Playing"
              isActive={"playing" === hightLigth}
              onClick={() => statusUpdate("playing", slug)}
            />
          </div>
          <button className="text-[#cbd4dc] mt-[.5rem] justify-between hover:border-[#badefc] hover:text-[#fff] rounded-[.3rem] duration-200 flex text-[16px] py-[.2rem] border-[#30394c] border-[1px] w-[100%] px-[.5rem] items-center mob:hidden"
           onClick={()=>setPopup({show:true,content:<AddToListSelector user={user} gameId={id} />,clickOutside:true})}
          >
            <span className="font-medium mx-auto">Add to Lists</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </>
      )}
    </div>
  );
}
