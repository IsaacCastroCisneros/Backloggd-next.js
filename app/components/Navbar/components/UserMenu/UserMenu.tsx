import React, { useState } from 'react'
import Option from '../Option'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


interface props
{
    username:string
    handleSingOut:()=>void
}

export default function UserMenu({username,handleSingOut}:props) 
{
  const[show,setShow]=useState<boolean>(false)

  const optionStyle = "bg-[transparent] font-normal px-[.4rem] block py-[.2rem] text-text2 hover:bg-gray6 capitalize"

  return (
    <>
      <ul
        className={`relative rounded-[.4rem_.4rem_0_0] ${
          show ? "bg-gray3" : ""
        }`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Option
          href={`/user/${username}`}
          onClick={()=>setShow(false)}
          className="flex items-center gap-[.2rem] p-[.4rem]"
        >
          {username} <FontAwesomeIcon icon={faChevronDown} />
        </Option>
        {show && (
          <ul
            className={`absolute bg-gray3 w-full bottom-0 left-0 translate-y-[100%] overflow-hidden rounded-[0_0_.4rem_.4rem] ${
              show ? "" : "pointer-events-none"
            }`}
          >
            <Option
              href={`/user/${username}`}
              onClick={()=>setShow(false)}
              className={optionStyle}
            >
              profile
            </Option>
            <Option
              href={`/user/${username}/edit`}
              onClick={()=>setShow(false)}
              className={optionStyle}
            >
              edit profile
            </Option>
            <Option
              href={`/user/${username}/games`}
              onClick={()=>setShow(false)}
              className={optionStyle}
            >
              games
            </Option>
            <Option
              href={`/user/${username}/lists`}
              onClick={()=>setShow(false)}
              className={optionStyle}
            >
              lists
            </Option>
            <Option
              href={`/user/${username}/reviews`}
              onClick={()=>setShow(false)}
              className={optionStyle}
            >
              reviews
            </Option>
          </ul>
        )}
      </ul>
      <button
        className="text-text2 text-[14px] hover:text-[#fff] font-medium"
        onClick={handleSingOut}
      >
        Log Out
      </button>
    </>
  );
}
