import React from 'react'
import ClientContent from './components/ClientContent'
import get from '@/server/get'

export default async function page() 
{
  const lol = await get({query:"select * from users"})

  return (
    <>
      <span className="text-[#fff]">{lol}</span>
      <ClientContent />
    </>
  );
}
