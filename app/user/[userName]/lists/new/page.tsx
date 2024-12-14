import ClientContent from "./components/ClientCotent";
import authorizeUser from "@/util/authorizeUser";
import NotFound from "@/app/not-found";


export default async function page({params}:any) 
{
  const {res} = await authorizeUser({userName:params.userName})
  const{authorized,user}=res[0]
  if(!authorized) return NotFound()

 
  return <ClientContent user={user}/>
}
