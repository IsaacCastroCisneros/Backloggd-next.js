import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import listItem from '../../../interfaces/listItem'

interface props extends listItem
{
  imgUrl:string|undefined
  handleDeleteItemList:(id:string)=>void
}

export default function Card(props:props) 
{
  const{imgUrl,name,handleDeleteItemList,listId}=props
  const[show,setShow]=useState<boolean>(false)

  const url = imgUrl ? choosingImgSize({url:imgUrl,size:"cover_big"}) : ""

  return (
    <div
      className="border-[1px] relative border-field rounded-[.3rem] overflow-hidden"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <img
        src="https://images.igdb.com/igdb/image/upload/t_cover_big/co24pm.jpg"
        width={210}
        height={280}
        className="opacity-0 pointer-events-none"
        alt="game cover"
      />
      <div className="absolute left-0 top-0 w-full h-full">
        <img
          src={url || "/img/no_image-eee1d555ae021e9cf0ca691c0e9ec60a.jpg"}
          width={210}
          height={280}
          alt="game cover"
        />
        {!url && (
          <span className="absolute font-medium text-[#fff] w-full px-[2rem] text-center top-[50%] translate-y-[-50%] line-clamp-4">
            {name}
          </span>
        )}
        {show && (
          <div className="bg-[#00000099] w-full text-[#fff] absolute left-0 bottom-0 flex justify-center">
            <button onClick={() => handleDeleteItemList(listId)}>
              <FontAwesomeIcon icon={faXmarkCircle} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
