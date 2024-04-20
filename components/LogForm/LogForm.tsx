"use client"

import React, { useContext, useEffect, useState } from 'react'
import Button from '@/components/Button'
import { global } from '@/app/context/GlobalContext'
import CardPic from '@/components/CardPic/CardPic'
import Score from '@/components/Score/Score'
import user from '@/interfaces/user'
import Select from '@/components/Select'
import StatusSwitcher from './components/StatusSwitcher/StatusSwitcher'
import gameLogin from '@/server/gameLogin'
import config from '../../interfaces/config'
import CancelingLog from './components/CancelingLog/CancelingLog'
import request from './util/request'
import Textarea from '../Textarea'
import getPlatforms from './server/getPlatforms'
import logFormProps from './interfaces/logFormProps'



export default function LogForm(props:logFormProps) 
{
  const { setPopup,setMsg } = useContext(global);

  const myDefault: config = {
    values: {
      status: "none",
      score: 0,
      review: "",
      platform: "",
    },
    firstValue: {
      status: "none",
      score: 0,
      review: "",
      platform: "", 
    },
    platformsIgdb: [],
    firstTime: true,
    loading: true,
    err:false
  };

  const [config, setConfig] = useState<config>(myDefault);
  const[showAdvice,setShowAdvice]=useState<boolean>(false)

  const { name, date, cover, id, user,state } = props;
  const { values, platformsIgdb,firstTime,loading,firstValue,err } = config;
  const{review,score,status,platform}=values

  const noChanges = JSON.stringify(firstValue) === JSON.stringify(values)

  useEffect(() => 
  { 
    if(state==="byPlatforms")
    {
      request({
        userId: user.id,
        gameId: id,
        setConfig,
        platformsFunc: () => JSON.stringify({ res: props.platforms }),
      });
      return
    }
    request({
      userId: user.id,
      gameId: id,
      setConfig,
      platformsFunc: () => getPlatforms(props.platformsId),
    });
  }, []);


  function clossingPopup() {
    setPopup((prev) => {
      return { ...prev, show: false };
    });

    if(showAdvice)setShowAdvice(false)

    setTimeout(() => {
      setConfig(myDefault);
    }, 200);
  }

  async function loginTheGame()
  {
      if(noChanges)return clossingPopup();

      const myStatus= status==="none" ? "played":status
      const { err } = JSON.parse(await gameLogin({
        game_id: id,
        user_id: user.id,
        ...values,
        status:myStatus,
      }));
      
      if(err)
      {
        setMsg({show:true,msg:"An error was occured",type:"fail"})
        return
      }
  
      const msg= firstTime ? "Log Created!":"Log Updated!"

      setMsg({show:true,msg,type:"success"})
      clossingPopup();
  }

  function cancelingLogin()
  {
    if (noChanges)return clossingPopup(); 
    setShowAdvice(true)
  }


  return (
    <div className="bg-bg relative border-border2 p-[16px] w-[660px] min-h-[462px] max-w-[100%] flex flex-col border-[1px] rounded-[.2rem] mob:p-[10px]">
      {showAdvice && (
        <CancelingLog
          setShowAdvice={setShowAdvice}
          clossingPopup={clossingPopup}
          loginTheGame={loginTheGame}
        />
      )}
      <span className="text-[#fff] text-[24px] font-bold block mb-[1rem]">
        {name}&nbsp;
        <span className="font-normal text-[20px] text-gray4">{date}</span>
      </span>
      {!loading && !err && (
        <>
          <div className="flex mob:flex-col">
            <div className="flex flex-col">
              <CardPic
                src={cover}
                height={178}
                width={132}
                className="mob:hidden"
              />
              <StatusSwitcher
                setConfig={setConfig}
                currentStatus={values.status}
              />
            </div>
            <div className="pl-[2rem] mob:pl-[1rem] flex-1 mob1:px-0">
              <div className="flex flex-col">
                <div className="flex justify-between mb-[1rem]">
                  <div>
                    <span className="text-[20px] mob:text-[16px] text-text mb-[.3rem] block">
                      Rating
                    </span>
                    <Score
                      size="big"
                      initialScore={score}
                      id={id}
                      user={user as user}
                      setConfig={setConfig}
                    />
                  </div>
                  <div className="flex-1 pl-[1rem]">
                    <span className="text-[20px] mob:text-[16px] text-text mb-[.3rem] block">
                      Platforms
                    </span>
                    {!loading && (
                      <Select
                        className="w-full"
                        value={platform}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            values: {
                              ...prev.values,
                              platform: e.target.value,
                            },
                          }))
                        }
                      >
                        <option value="none">Choose a platform...</option>
                        {platformsIgdb.map((plat, pos) => (
                          <option key={pos} value={plat.id}>
                            {plat.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full mb-[1rem]">
                <span className="text-[20px] mob:text-[16px] text-text mb-[.3rem] block">
                  Review
                </span>
                <Textarea
                  maxLength={3000}
                  value={review}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      values: { ...prev.values, review: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex mt-auto ml-auto gap-[1rem]">
            <Button myType="cancel" onClick={cancelingLogin}>
              Cancel
            </Button>
            {!noChanges && (
              <Button onClick={loginTheGame}>
                {firstTime ? "Create Log" : "Save Changes"}
              </Button>
            )}
          </div>
        </>
      )}
      {loading && !err && (
        <span className="text-[2rem] text-[#fff] w-[100%] mt-[5rem] flex justify-center items-center">
          Loading...
        </span>
      )}
      {err && (
        <span className="text-[2rem] text-[#fff] w-[100%] mt-[5rem] flex justify-center items-center">
          An error was occured
        </span>
      )}
    </div>
  );
}


