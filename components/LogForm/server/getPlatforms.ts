"use server"

import igdb from "@/util/igdb"
import platform from "../../../interfaces/platform"

export default async function getPlatforms(ids:Array<string>):Promise<{res:Array<platform>,err:null|unknown}> 
{
   const{res,err}=await igdb({type:"platforms",query:`where id=(${ids.join(",")}); fields name;`})

   return {res:res as Array<platform>,err}
}
