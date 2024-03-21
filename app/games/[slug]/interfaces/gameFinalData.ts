import igdbResponse from "@/interfaces/igdbResponse";

export default interface gameFinalData 
{
    id:string
    name:string
    summary:string
    cover:string
    platforms:Array<string>
    genres:Array<string>
    screenshot:string
    date:string
    publisher:string
    developer:string
  }