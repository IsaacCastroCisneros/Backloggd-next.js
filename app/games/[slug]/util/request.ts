import igdb from "@/util/igdb"

const request =async({type,id,fields}:{type:string,id:string,fields:string})=>
{
  return await igdb({type,query:`where id=(${id}); fields ${fields};`})
}

export default request