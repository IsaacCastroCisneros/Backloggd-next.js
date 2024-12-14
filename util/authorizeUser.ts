"use server"

import getUser from '@/app/user/[userName]/server/getUser'
import user from '@/interfaces/user'
import myGetServerSession from './myGetServerSession'


interface props
{
    userName:string
}

export default async function authorizeUser({userName}:props):Promise<{res:Array<{user:user,authorized:boolean}>,err:unknown}>
{
    try
    {   
        const {res:userRes} = JSON.parse(await getUser({userName})) 
        const user =userRes[0] as user
      
        const session = await myGetServerSession()
        const authorized = session ? session.username===user.username : false
      
        return {res:[{user,authorized}],err:null}
    }
    catch(err)
    {
        return {res:[],err}
    }
}
