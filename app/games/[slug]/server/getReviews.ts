"use server"

import get from "@/server/get"
import reviewResponse from "../ClientContent/components/RiteContainer/components/Reviews/interfaces/reviewResponse"

export default async function getReviews({gameId}:{gameId:string}) 
{
  const { res,err } = JSON.parse(
    await get({
      query: `select user_id, score, review, status from game where game_id=? and (review!="" and review!="null")`,
      data: [gameId],
    })) as { res: Array<reviewResponse>, err:any};

  if(err)
  {
    return {res:[],err}
  }

  try
  {
    const reviews = res.map(async(res)=>
      {
         const {res:userRes} = JSON.parse(await get({query:"select username from users where id=?",data:[res.user_id]})) 
   
         return {...res,username:userRes[0].username}
      })
    return {res:await Promise.all(reviews),err:null}  
  }
  catch(secondErr)
  {
    return {res:[],err:[err,secondErr]}
  }

}
