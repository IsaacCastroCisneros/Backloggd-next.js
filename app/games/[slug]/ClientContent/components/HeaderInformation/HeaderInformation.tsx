import React from 'react'

interface props
{
  name:string
  date:string
  developer:string
  publisher:string
}

export default function HeaderInformation(props:props) 
{
  const{name,date,developer,publisher}=props

  return (
    <>
      <h1 className="text-[2.5rem] text-[#fff] font-medium mob:text-[1.1rem]">{name}</h1>
      <p className="text-text7 text-[20px] block mb-[.8rem] mob:text-[1rem]">
        released on <span className="font-medium text-text2">{date}</span> by{" "}
        <span className="font-medium text-text2">{developer}</span>,{" "}
        <span className="font-medium text-text2">{publisher}</span>
      </p>
    </>
  );
}
