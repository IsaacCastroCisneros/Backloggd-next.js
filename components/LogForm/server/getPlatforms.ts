"use server"

import igdb from "@/util/igdb"
import platform from "../../../interfaces/platform"

export default async function getPlatforms(ids:Array<string>):Promise<string> 
{
   const{res,err}=await igdb({type:"platforms",query:`where id=(${ids.join(",")}); fields name;`})

   return JSON.stringify({res:res as Array<platform>,err}) 
}
