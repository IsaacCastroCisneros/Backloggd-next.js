"use client"

import LabedInput from '@/components/LabedInput'
import LabedTextarea from '@/components/LabedTextarea'
import user from '@/interfaces/user'
import React, { FormEvent, use, useContext, useEffect, useState } from 'react'
import updateUser from './server/updateUser'
import { SignInResponse, signIn, useSession } from 'next-auth/react'
import { global } from '@/app/context/GlobalContext'
import Button from '@/components/Button'
import Link from 'next/link'
import SearcherIGDB from '../../components/SearcherIGDB/SearcherIGDB'
import Favorites from './components/Favorites'
import { context } from './context/context'
import favorite from './interfaces/favorite'
import cardPosition from '../../../../../types/favoritePosition'
import defaulFavorites from './util/defaultFavorites'
import updatingFavoritesByIndex from './util/updatingFavoritesByIndex'
import loginFavorite from './server/loginFavorite'
import favoritePosition from '../../../../../types/favoritePosition'
import removingEmptyLogs from './server/removingEmptyLogs'
import { useRouter } from 'next/navigation'
import sameUserName from '../../server/sameUserName'

interface props extends user
{
  initialFavorites:Array<favorite>
}

export default function ClientContent(props:props) 
{
    const{setMsg,setPopup,setloadSpinner}=useContext(global)
    const[favorites,setFavorites]=useState<Array<favorite>>(defaulFavorites)
    const{data} =useSession() 
    const{user}=data || {user:{}as user}
    const{username:name,id:idUser}=user as user
    const router = useRouter()

    const{username,twitter,bio,initialFavorites}=props 

    useEffect(()=>
    {
      if(initialFavorites.length>0)
      {
        setFavorites(initialFavorites)
      }
    },[])

    async function submittingForm(e:FormEvent<HTMLFormElement>)
    {
       e.preventDefault();

       const formData= new FormData(e.currentTarget)
       const data=Object.fromEntries(formData)
       const{username}=data

       if(username==="")
        {
          return  setMsg({msg:"User's name is needed",type:"fail",show:true})
        }

       const isTheSameUserName = await sameUserName({userName:username as string})
       if(username!==name)
       {
         if(isTheSameUserName)
          {
            return  setMsg({msg:"The user's name already exists",type:"fail",show:true})
          }
       }

       const {initialFavorites,...myProps} = props

       setloadSpinner(true) 

       const{err}=JSON.parse(await updateUser({newUserData:{...myProps,...data},userName:name})) 
    
       const thereIsFavorites = favorites.filter(fav=>fav.id!=="")
        
       await removingEmptyLogs({userId:idUser})

       if(thereIsFavorites.length>0)
       {
         const arr:Array<favoritePosition> = ["0","1","2","3","king"]
         const final = arr.map(entry=>
          {
            const thereIs= thereIsFavorites.find(fav=>fav.pos===entry)

            if(thereIs)return thereIs
            return {pos:entry,isIn:false,id:"",slug:""}
          })
         
         const favoritesToDB = final.map((fav) =>
           loginFavorite({favorite:{ game_id: fav.id,
            favorite: fav.isIn,
            user_id: idUser,
            favorite_position: fav.pos,
            slug:fav.slug},
            userName:name
           } )
         );

        await Promise.all(favoritesToDB);

      }
       
       if(err)
       {
         setloadSpinner(false)
         return setMsg({msg:"an error was occurred",type:"fail",show:true})
       }

             
       const {error} = await signIn("credentials", {
        email:props.email,
        password:data.password||props.password,
        redirect: false,
      }) as SignInResponse
       setloadSpinner(false)

      if(!error)
      {
        setMsg({msg:"User updated",type:"success",show:true})
        router.push(`/user/${username}`)
        router.refresh()
      }
    }

    function updateFavorites(newFavorite:favorite|Array<favorite>)
    {
      setFavorites(updatingFavoritesByIndex({ favorites, newFavorite }));
    }

    function showPopup(pos:cardPosition)
    {

      setPopup({
        show: true,
        content: (
          <div className="w-[50rem] max-w-full top-[-10rem] absolute right-[50%] translate-x-[50%]">
            <SearcherIGDB updateFavorites={updateFavorites} pos={pos} />
          </div>
        ),
        clickOutside: true,
      });
    }

    const values:context=
    {
      showPopup,
      favorites,
      updateFavorites
    }

  return (
    <context.Provider value={values}>
      <h1 className=" text-text4 text-[32px] font-medium mb-[.8rem] block">
        Profile
      </h1>
      <form className="w-full" onSubmit={submittingForm}>
        <div className="flex gap-[1rem] mob:flex-col">
          <LabedInput
            label="Username"
            props={{
              input: {
                maxLength: 16,
                name: "username",
                defaultValue: username,
              },
              container: { className: "flex-1" },
            }}
          />
          <LabedInput
            label="Twitter handle"
            props={{
              input: { maxLength: 99, name: "twitter", defaultValue: twitter },
              container: { className: "flex-1" },
            }}
          />
        </div>
        <LabedTextarea
          label="Biography"
          props={{
            textarea: { maxLength: 602, name: "bio", defaultValue: bio },
            container: { className: "mt-[1.2rem]" },
          }}
        />
        <Favorites />
        <div className="flex gap-[1rem] items-end justify-end mt-[2rem] mob:mt-[4rem]">
          <Link href={`/user/${name}`} className=" text-text hover:underline">
            Cancel
          </Link>
          <Button>Save Changes</Button>
        </div>
      </form>
    </context.Provider>
  );
    
}
