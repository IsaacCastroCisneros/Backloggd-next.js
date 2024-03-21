import igdb from '@/util/igdb'
import choosingImgSize from '../search/components/Results/util/choosingImgSize'
import randomizer from '@/util/randomizer'
import gameFinalData from './interfaces/gameFinalData'
import igdbResponse from '@/interfaces/igdbResponse'
import gettingCompanies from './util/gettingCompanies'
import request from './util/request'
import ClientContent from './ClientContent/ClientContent'


const TBD = "TBD"

export default async function page({params}:any) 
{
  const{slug}=params
  const {res} = await igdb({type:"games",query:`where slug="${slug}"; fields *;`}) as {res:Array<igdbResponse>} 
  const generalData= res[0]

  const {
    cover: coverId="",
    platforms: platformsIds=[],
    screenshots: screenshotsIds=[],
    release_dates: release_datesIds=[],
    involved_companies:involved_companiesIds=[],
    genres:genresIds=[],
    id
  } = generalData;

  const [
    { res: cover },
    { res: platforms },
    { res: screenshots },
    { res: genres },
    { res: date },
    { res: involved_companies },
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
  }


  return <ClientContent gameFinalData={gameFinalData} />
}
