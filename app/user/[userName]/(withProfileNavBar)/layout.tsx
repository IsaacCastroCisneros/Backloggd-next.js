import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'
import getUser from '../server/getUser'
import ErrMsg from '@/components/ErrMsg'
import user from '@/interfaces/user'
import Link from 'next/link'
import Navbar from './components/Navbar'

export default async function layout({children,params}:{children:ReactNode,params:any}) 
{
  const{userName}=params
  const session= await getServerSession(authOptions)
  const user=session?.user as user

  const isMyProfile= session ? user.username===userName : false

  try
  {
    const{res,err}=JSON.parse(await getUser({userName})) 
    if(err)return <ErrMsg/>

    const{username,twitter}=res[0] as user

    return (
      <>
        <div className="flex justify-between items-end mb-[.7rem]">
          <section>
            <h1 className="text-[28px] text-[#fff] font-medium mob:text-[25px]">{username}</h1>
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              className="text-[#cbd4dc] hover:text-[#fff] flex items-center gap-[.5rem] mob:text-mobText"
            >
              <FontAwesomeIcon icon={faTwitter} />
              {twitter}
            </a>
          </section>
          {isMyProfile && (
            <Link href={`/user/${userName}/edit`} className="text-[#fff] px-[.2rem] bg-gray3 rounded-[.3rem] mob:text-mobText">
              Edit Profile
            </Link>
          )}
        </div>
        <Navbar userName={userName} />
        {children}
      </>
    );                                                                
   }
  catch(err)
  {
    return <ErrMsg/>
  }

}
