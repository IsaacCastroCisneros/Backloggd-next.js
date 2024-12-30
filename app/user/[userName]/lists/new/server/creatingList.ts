"use server"

import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'
import listItem from '../../interfaces/listItem'
import insertGameAndList from '@/server/insertGameAndList'
import authorizeUser from '@/util/authorizeUser'

interface props
{
    user_id:string
    name:string
    description:string
    lists:Array<listItem>
    slug:string
    userName:string
}


export default async function creatingList({lists,user_id,slug,userName,...props}:props):Promise<string> 
{
   const{res}=await authorizeUser({userName})
   const{authorized}=res[0]

   if(!authorized)return JSON.stringify({res:[],err:"unauthorized"})

   try
   {  
     let mySlug = slug 
     const [nameCount] =await pool.query<Array<RowDataPacket>>("select count(*) frlist where name=?",[props.name])
     const count = nameCount[0]["count(*)"]

     if(count>0)
    {
      const slugArr= mySlug.split("-")
      
      mySlug = [...slugArr, count].join("-");
    } 

    const [results] =await pool.query<Array<RowDataPacket>>("insert into game_list set ?",{...props,user_id,slug:mySlug})
  
    if(lists.length===0)return JSON.stringify({res:[props,mySlug],err:null})

    const listResults=results as any 

    await insertGameAndList({userId:user_id,list:lists,listIdFromDb:listResults.insertId})

    return JSON.stringify({res:[props,mySlug],err:null})
   
   }
   catch(err)
   {
     console.log(err)
     return JSON.stringify({res:[],err}) 
   }
}
