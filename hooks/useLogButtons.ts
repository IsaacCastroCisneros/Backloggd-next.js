import { global } from '@/app/context/GlobalContext'
import gameLogin from '@/server/gameLogin'
import getGame from '@/server/getGame'
import gameStatus from '@/types/gameStatus'
import  { useContext, useState } from 'react'
import { useQuery } from 'react-query'

interface props
{
  game_id:string 
  user_id:string
}

export default function useLogButtons({game_id,user_id}:props) 
{
  const[hightLigth,setHightLigth]=useState<gameStatus>("none")
  useQuery(["data",],gettingGameDataDB)
  const{setMsg}=useContext(global)

  async function gettingGameDataDB({queryKey}:any)
  {
    const[_key,{game_id,user_id}]=queryKey
    const{res,err}=JSON.parse(await getGame(game_id,user_id))
    if(err)return"none" 
    setHightLigth(res[0].status) 
  }

  async function statusUpdate(status:gameStatus) 
  { 
    const {err} = JSON.parse(await gameLogin({game_id,user_id,status})) 
    if(!err)
    {
      setHightLigth(status)
      setMsg({show:true,msg:"Updated",type:"success"})
    }
  }


  return{
    statusUpdate,
    
  }
}
