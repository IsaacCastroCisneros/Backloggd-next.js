import { getServerSession } from "next-auth";
import ClientContent from "./components/ClientCotent";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { notFound } from "next/navigation";
import user from "@/interfaces/user";


export default async function page() 
{
  const session = await getServerSession(authOptions)
  if(session===null)return notFound()
 
  return <ClientContent user={session.user as user}/>
}
