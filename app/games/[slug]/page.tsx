import igdb from '@/util/igdb'
import choosingImgSize from '../search/components/Results/util/choosingImgSize'
import randomizer from '@/util/randomizer'
import gameFinalData from './interfaces/gameFinalData'
import igdbResponse from '@/interfaces/igdbResponse'
import gettingCompanies from './util/gettingCompanies'
import request from './util/request'
import ClientContent from './ClientContent/ClientContent'
import gettingGameDbData from './server/gettingGameDbData'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import getGame from '@/server/getGame'
import user from '@/interfaces/user'
import gameLog from '@/interfaces/gameLog'
import logGameData from '@/interfaces/logGameData'


const TBD = "TBD"

export default async function page({params}:any) 
{
  const{slug}=params
  const {res} = await igdb({type:"games",query:`where slug="${slug}"; fields *;`}) as {res:Array<igdbResponse>} 
  const generalData= res[0]
  const session= await getServerSession(authOptions)
  const user = session?.user as user

  
  const {
    cover: coverId="",
    platforms: platformsIds=[],
    screenshots: screenshotsIds=[],
    release_dates: release_datesIds=[],
    involved_companies:involved_companiesIds=[],
    genres:genresIds=[],
    id,
  } = generalData;
  
  const {res:gameDbData} = JSON.parse(await gettingGameDbData([id,id,id]))

  const [
    { res: cover },
    { res: platforms },
    { res: screenshots },
    { res: genres },
    { res: date },
    { res: involved_companies },
    gameByUser ,
  ] = await Promise.all([
    request({ type: "covers", id: `${coverId}`, fields: "url" }),
    request({
      type: "platforms",
      id: `${platformsIds.join(",")}`,
      fields: "name",
    }),
    request({
      type: "screenshots",
      id: `${randomizer(screenshotsIds)}`,
      fields: "url",
    }),
    request({
      type: "genres",
      id: `${genresIds.join(",")}`,
      fields: "name",
    }),
    request({type:"release_dates",id:`${release_datesIds.join(",")}`,fields:"human"}),
    request({type:"involved_companies",id:`${involved_companiesIds.join(",")}`,fields:"*"}),
    session ? getGame(`${id}`,user.id) : "null"
  ]);

  const [{res:developer},{res:publisher}] = await Promise.all([request({
    type: "companies",
    id: `${gettingCompanies({companies:involved_companies,param:"developer"})}`,
    fields: "name",
  }),request({
    type: "companies",
    id: `${gettingCompanies({companies:involved_companies,param:"publisher"})}`,
    fields: "name",
  })])

  const finalScreenshot = screenshots[0] ? choosingImgSize({url:screenshots[0].url,size:"1080p"}):""

  const gameFinalData:gameFinalData=
  {
    id:`${id}`,
    name:generalData.name,
    summary:generalData.summary,
    cover:cover[0] ? cover[0].url:undefined,
    platforms:platforms.map(platform=>platform.name),
    genres:genres.map(genre=>genre.name),
    screenshot:finalScreenshot,
    date:date[0] ? date[0].human : TBD,
    publisher:publisher[0] ? publisher[0].name:TBD,
    developer:developer[0] ? developer[0].name:TBD,
    slug
  }

  const gameFinalDbData:gameDbData=
  {
     playing:gameDbData[0] ? gameDbData[0].playing :0,
     plays:gameDbData[0] ? gameDbData[0].plays :0,
     listed:gameDbData[0] ? gameDbData[0].listed :0
  }

  const gameData = JSON.parse(gameByUser).res[0] as gameLog

  const logGameData:logGameData=
  {
    ...gameData,
    platformsIGDB:platforms.map(platform=>({id:platform.id,name:platform.name})),
  }

  return (
    <ClientContent
      gameFinalData={gameFinalData}
      gameDbData={gameFinalDbData}
      logGameData={logGameData}
    />
  );
}
