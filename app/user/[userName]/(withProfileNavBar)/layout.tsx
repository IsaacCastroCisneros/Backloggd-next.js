import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import getUser from '../server/getUser'
import ErrMsg from '@/components/ErrMsg'
import user from '@/interfaces/user'
import Link from 'next/link'
import Navbar from './components/Navbar'
import authorizeUser from '@/util/authorizeUser'
import NotFound from '@/app/not-found'

export default async function layout({children,params}:{children:ReactNode,params:any}) 
{
  const{userName}=params
  const{res,err}=await authorizeUser({userName})
  if(err)return NotFound()
  const{authorized}=res[0]

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
          {authorized && (
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
