"use server"
import axios from "axios"

export default async function gettingIGDBKey():Promise<string> 
{
    try
    {
       const res= await axios.post("https://id.twitch.tv/oauth2/token?client_id=h8j1a9qs3atk4blop7oiz3yvouv5py&client_secret=votrkcfyrmep9rxbze2oqfx12w45j4&grant_type=client_credentials")

       const token = res.data.token
       
       return JSON.stringify({res:[token],err:null}) 
    }
    catch(err) 
    {    
       return JSON.stringify({err,res:[]}) 
    }
}