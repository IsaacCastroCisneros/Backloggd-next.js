import React from 'react'
import getUser from '../server/getUser'
import ErrMsg from '@/components/ErrMsg/ErrMsg'
import ClientContent from '../components/ClientContent/ClientContent'
import user from '@/interfaces/user'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function page({params}:any) 
{
  return <div className='text-[#fff]'>the rest</div>

}
