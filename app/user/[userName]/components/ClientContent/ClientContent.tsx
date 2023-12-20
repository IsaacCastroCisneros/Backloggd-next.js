import user from '@/interfaces/user'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface props extends Omit<user,"password">
{
  
}

export default function ClientContent(props:props) 
{
  const{username}=props

  return (
    <>
    <div className='flex justify-between items-center'>
      <section>
        <h1 className="text-[28px] text-[#fff] font-medium">{username}</h1>
        <span className="text-[#fff]">
          <FontAwesomeIcon icon={faTwitter} />
        </span>
      </section>
       <button className='text-[#fff] px-[.2rem] bg-gray3 rounded-[.3rem]'>
          Edit Profile
       </button>
    </div>
    </>
  );
}
