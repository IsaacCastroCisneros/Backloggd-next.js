import user from '@/interfaces/user'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface props extends Omit<user,"password">
{
  isSession:boolean
}

export default function ClientContent(props:props) 
{
  const{username,isSession,twitter}=props

  return (
    <>
      <div className="flex justify-between items-end">
        <section>
          <h1 className="text-[28px] text-[#fff] font-medium">{username}</h1>
          <a href={`https://twitter.com/${twitter}`} target='_blank' className="text-[#cbd4dc] hover:text-[#fff] flex items-center gap-[.5rem]">
            <FontAwesomeIcon icon={faTwitter} />
            {
              twitter
            }
          </a>
        </section>
        {isSession && (
          <button className="text-[#fff] px-[.2rem] bg-gray3 rounded-[.3rem]">
            Edit Profile
          </button>
        )}
      </div>
    </>
  );
}
