import React from 'react'
import Option from './Option'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


interface props
{
    username:string
    handleSingOut:()=>void
}

export default function UserMenu({username,handleSingOut}:props) 
{
  return (
    <>
      <Option href={`/user/${username}`} className='flex items-center gap-[.2rem] bg-text4 px-[.5rem]'>
        {username} <FontAwesomeIcon icon={faChevronDown} />
      </Option>
      <button
        className="text-text2 text-[14px] hover:text-[#fff] font-medium"
        onClick={handleSingOut}
      >
        Log Out
      </button>
    </>
  );
}
