import user from '@/interfaces/user'
import getScore from '@/server/getScore'
import { useQuery } from 'react-query'

interface props
{
  gameId:string
  user:user|null
}

const request=async({queryKey}:any)=>
{
    const{gameId,user}=queryKey[1]
    if(user===null) return 0

    const {res} = JSON.parse(await getScore(gameId,user.id)) 
    if(res.length===0)return 0
    return res[0].score
}

export default function useScoreByUser({gameId,user}:props) 
{
    const{data:initialScore}=useQuery(["score",{gameId,user}],request)

    return initialScore
}
