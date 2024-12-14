import React from 'react'
import getUser from '../../../server/getUser'
import gameByType from '../interfaces/gameByType'
import NotFound from '@/app/not-found'
import user from '@/interfaces/user'
import getGamesByPage from '@/server/getGamesByPage'
import getOffset from '@/components/PaginationPanel/util/getOffset'
import { game } from '@/interfaces/game'
import getFullGameIGDB from '@/util/getFullGameIGDB'
import getFinalGames from '@/util/getFinalGames'




export default async function getGamesByType({page,type,userId}:gameByType):Promise<string> 
{
    try
    {
        const {res:results} = JSON.parse(await getGamesByPage({user_id:userId,limit:40,offset:getOffset(page,40),type})) 
        const {games,quantity}=results as {games:Array<game>,quantity:string}
        
        const ids = games.map(game=>game.game_id)
      
        const igdbGames = await getFullGameIGDB({ids,limit:40})
      
        const finalGames = getFinalGames({games,igdbGames}).sort((a, b) => b.score - a.score)

        return JSON.stringify({res:{finalGames,quantity},err:null}) 
    }
    catch(err)
    {
       console.log(err)
       return JSON.stringify({res:[],err}) 
    }

}
