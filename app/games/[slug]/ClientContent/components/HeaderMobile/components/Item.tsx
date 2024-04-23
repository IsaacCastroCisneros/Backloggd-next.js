import React from 'react'

interface props
{
  number:number
  label:string
}

export default function Item({number,label}:props) 
{
  return (
    <li className="flex flex-col items-center">
      <span className="font-medium text-[#fff]">{number}</span>
      <p className="text-[14px] text-text">{label}</p>
    </li>
  );
}
