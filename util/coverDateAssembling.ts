interface props
{
    games:Array<Record<any,any>>
    model:Record<any,any>
    covers:Array<Record<any,any>>
    dates:Array<Record<any,any>>
}

export default function coverDateAssembling(props:props)
{
    const{games,model,covers,dates}=props

    return games.map((gcd:any)=>
    {

       covers.forEach((c:any)=>
       {
          if(c.game===gcd.id)
          {
            model.cover=c.url
          }
       })

       dates.forEach((y:any)=>
       {
          if(y.game===gcd.id)
          {
            model.date=y.y
          }
       })
       
       return model
    })
}