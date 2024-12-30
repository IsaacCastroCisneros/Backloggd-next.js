import pool from '@/config/db'
import { RowDataPacket } from 'mysql2'

interface props
{
   slug:string
   listName:string
}


export default async function validateSameSlug({slug,listName}:props):Promise<string> 
{
    let mySlug = slug 
    const [nameCount] =await pool.query<Array<RowDataPacket>>("select count(*) from game_list where name=?",[listName])
    const count = nameCount[0]["count(*)"]

    if(count>0)
   {
     const slugArr= mySlug.split("-")
     mySlug = [...slugArr, count].join("-");
   } 

   return mySlug
}
