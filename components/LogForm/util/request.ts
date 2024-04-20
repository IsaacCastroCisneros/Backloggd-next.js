
import getGame from "@/server/getGame";
import { Dispatch, SetStateAction } from "react";
import config from "../../../interfaces/config";

interface props
{
   gameId:string
   userId:string
   setConfig:Dispatch<SetStateAction<config>>
   platformsFunc:()=>string|Promise<string>
}

export default async function request(props:props) 
{
    const{gameId,userId,setConfig,platformsFunc}=props
    
      try 
      {
        const results =  await Promise.all([
          getGame(gameId, userId),
          platformsFunc()
        ]);

        const { res: gameData } = JSON.parse(results[0]);
        const { res: finalPlatforms } = JSON.parse(results[1]);

        if (gameData.length > 0) 
        {
          const gameDb = gameData[0];
          const firstValue={
            status: gameDb.status,
            score: gameDb.score,
            review: gameDb.review,
            platform:
              gameDb.platform !== "" ? gameDb.platform : "0" ,
          }

          setConfig(prev=>
            (
              {
                ...prev,
                values:firstValue,
                firstValue,
                firstTime:false,
                platformsIgdb:finalPlatforms,
                loading:false
              }
            ) );
          return;
        }
        setConfig(prev=>({...prev,platformsIgdb:finalPlatforms,loading:false}))

      } catch (err) {
        setConfig(prev=>({...prev,err:true}))
      }
}