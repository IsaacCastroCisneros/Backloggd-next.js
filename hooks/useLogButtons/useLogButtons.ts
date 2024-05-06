import { global } from '@/app/context/GlobalContext'
import gameLogin from '@/server/gameLogin/gameLogin'
import getGame from '@/server/getGame'
import  { useContext, useState } from 'react'
import { useQuery } from 'react-query'

interface props
{
  game_id:string 
  user_id:string
}

export default function useLogButtons({game_id,user_id}:props) 
{
  const[hightLigth,setHightLigth]=useState<status>("none")
  useQuery(["data",{game_id,user_id}],gettingGameDataDB)
  const{setMsg}=useContext(global)

  async function gettingGameDataDB({queryKey}:any)
  {
    const[_key,{game_id,user_id}]=queryKey
    const{res,err}=JSON.parse(await getGame(game_id,user_id))
    if(err)return"none" 
    const status = res[0].status
    if(status==="none")return
    setHightLigth(status==="playing" ? status:"played") 
  }

  async function statusUpdate(status:status) 
  { 
    const {err} = JSON.parse(await gameLogin({game_id,user_id,status,type:"status"})) 
    if(!err)
    {
      setHightLigth(status)
      setMsg({show:true,msg:"Updated",type:"success"})
    }
  }

  return{
    statusUpdate,
    hightLigth
  }
}
