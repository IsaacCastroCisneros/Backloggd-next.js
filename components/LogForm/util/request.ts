import getGame from "@/server/getGame";
import getPlatforms from "../server/getPlatforms";
import { Dispatch, SetStateAction } from "react";
import config from "../interfaces/config";
import gameLog from "@/interfaces/gameLog";

interface props
{
   platforms:Array<string>
   gameId:string
   userId:string
   setConfig:Dispatch<SetStateAction<config>>
   values:gameLog
}

export default async function request(props:props) 
{
    const{platforms,gameId,userId,setConfig,values}=props

      try 
      {
        const results =  await Promise.all([
          getPlatforms(platforms),
          getGame(gameId, userId),
        ]);

        const { res: platformsIgdb } = results[0];
        const { res: gameArr } = JSON.parse(results[1]);

        if (platformsIgdb.length > 0) 
        {
          const platform="none"

          setConfig(prev=>
            (
              {
                ...prev,
                values: { ...values, platform},
                platformsIgdb,
                loading:false,
                firstValue:{...prev.firstValue,platform}
              }
            ));
        }

        if (gameArr.length > 0) {
          const gameDb = gameArr[0];
   
          const firstValue={
            status: gameDb.status,
            score: gameDb.score,
            review: gameDb.review,
            platform:
              gameDb.platform !== "" ? gameDb.platform : platformsIgdb[0].id,
          }

          setConfig(prev=>
            (
              {
                ...prev,
                values:firstValue,
                firstValue,
                firstTime:false,
                platformsIgdb,
                loading:false
              }
            ) );
          return;
        }

      } catch (err) {
        setConfig(prev=>({...prev,err:true}))
      }
    }