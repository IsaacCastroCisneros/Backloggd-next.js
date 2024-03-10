import igdb from '@/util/igdb'
import choosingImgSize from '../search/components/Results/util/choosingImgSize'

const request =async({type,id,fields}:{type:string,id:string,fields:string})=>
{
  return await igdb({type,query:`where id=(${id}); fields ${fields};`})
}

export default async function page({params}:any) 
{
  const{slug}=params
  const {res} = await igdb({type:"games",query:`where slug="${slug}"; fields *;`})
  const generalData= res[0]

  const{cover:coverId,platforms:platformsIds}=generalData

  const [
    { res: cover },
    { res: platforms },
    { res: artworks },
    { res: genres },
  ] = await Promise.all([
    request({ type: "covers", id: `${coverId}`, fields: "url" }),
    request({
      type: "platforms",
      id: `${platformsIds.join(",")}`,
      fields: "name",
    }),
    request({
      type: "artworks",
      id: `${generalData.artworks[0]}`,
      fields: "url",
    }),
    request({
      type: "genres",
      id: `${generalData.genres.join(",")}`,
      fields: "name",
    }),
  ]);

  const finalCover = choosingImgSize({url:cover[0].url,size:"cover_big"})

  const gameFinalData=
  {
    name:generalData.name,
    summary:generalData.summary,
    cover:finalCover,
    platforms:platforms.map(platform=>platform.name),
    genres:genres.map(genre=>genre.name)
  }

  return null
}
