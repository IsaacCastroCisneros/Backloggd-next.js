"use server"

import axios from 'axios';

interface props
{
    type:string
    query?:string
}

export default async function igdb({type,query=""}:props):Promise<{res:Array<any>,err:null|unknown}> 
{
   const headers = 
   {
     headers:
     {
        'Accept': 'application/json',
        'Client-ID' : 'h8j1a9qs3atk4blop7oiz3yvouv5py',
        'Authorization' :  'Bearer fcbmqo34ilf735r1746kvq3e0p2le6', 
     }
   }
   try
   {
      const res= await axios.post(`https://api.igdb.com/v4/${type}/`,query,headers)
      return {res:res.data,err:null}
   }
   catch(err) 
   {    
      return {err,res:[]}
   }
   
}