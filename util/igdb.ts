"use server"

import axios from 'axios';
import gettingIGDBKey from './gettingIGDBKey';
import { json } from 'stream/consumers';

interface props
{
    type:string
    query?:string
}

export default async function igdb({type,query=""}:props):Promise<{res:Array<any>,err:null|unknown}> 
{

/* 
   const token= JSON.parse(await gettingIGDBKey())  */

   const headers = 
   {
     headers:
     {
        'Accept': 'application/json',
        'Client-ID' : 'h8j1a9qs3atk4blop7oiz3yvouv5py',
        'Authorization' :  'Bearer iizgywvd75v8z9llv08ujvjvxk8d9r', 
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