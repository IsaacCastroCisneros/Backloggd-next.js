import axios from 'axios';

interface props
{
    type:string
    query?:string
}

export default async function igdb({type,query=""}:props):Promise<{res:Array<Record<any,any>>,err:null|unknown}> 
{
   const headers = 
   {
     headers:
     {
        'Accept': 'application/json',
        'Client-ID' : 'c5zbqhwccotr4honkq7do968evsfr1',
        'Authorization' :  'Bearer y7h59m1r6fs6wk9dhvkhvjkq6rijgm', 
     }
   }
   try
   {
      const res= await axios.post(`https://api.igdb.com/v4/${type}/`,query,headers)
      return {res:res.data,err:null}
   }
   catch(err)
   {    
      console.log(err)
      return {err,res:[]}
   }
   
}