import React from 'react'
import ClientContent from './components/ClientContent';
import get from '@/server/get';



export default async function page() 
{
  const {res,err}= JSON.parse( await get({query:"select * from users"})) 



  return (
    <>
    {
      JSON.stringify(res)
    }
    {
      JSON.stringify(err)
    }
    <ClientContent/>
    </>
  );
}
