export default function getCoverDate({games}:{games:Array<Record<any,any>>}):{coversIds:string,dateIds:string}
{
    let coversIds:Array<string>=[]
  let dateIds:Array<string>=[]

  games.forEach((game:any)=>
    {
      if(game.cover!==undefined)
      {
        coversIds=[...coversIds,game.cover]
      }
      if(game.release_dates!==undefined)
      {
        dateIds = [...dateIds, game.release_dates[0]];
      }
    })

  return {coversIds:coversIds.join(','),dateIds:dateIds.join(',')}
}