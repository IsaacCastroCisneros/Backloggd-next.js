"use server"

import get from "@/server/get"
import reviewResponse from "../interfaces/reviewResponse"
import request from "../util/request";

export default async function getReviews({gameId}:{gameId:string}) 
{
  const { res,err } = JSON.parse(
    await get({
      query: `select user_id, score, review, status, platform from game where game_id=? and (review!="" and review!="null")`,
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
         const{res:platform}=await request({type:"platforms",id:res.platform,fields:"name"})
   
         return {...res,username:userRes[0].username,platform:platform[0].name}
      })
    return {res:await Promise.all(reviews),err:null}  
  }
  catch(secondErr)
  {
    return {res:[],err:[err,secondErr]}
  }

}
