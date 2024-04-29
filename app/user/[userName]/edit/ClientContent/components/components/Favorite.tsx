"use client"

import { ButtonHTMLAttributes, useContext, useState } from "react";
import { context } from "../../context/context";
import favorite from "../../interfaces/favorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCrown, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
   favorite:favorite
}

export default function Favorite(props:props)
{
  const{favorite,...myProps}=props
  const{isIn,pos,cover,id}=favorite
  const[hover,setHover]=useState(false)
  const{showPopup,updateFavorites}=useContext(context)

  function handleShowPopup()
  {
    showPopup(pos)
  }

  function handleDeletingFavorite()
  {
    updateFavorites({
      pos,
      isIn: false,
      id,
      cover: "",
    });
    setHover(false)
  }
 

  const imgFavorite=
  {
    backgroundImage: isIn ? `url(${cover||"/img/no_image-eee1d555ae021e9cf0ca691c0e9ec60a.jpg"})` : "",
    backgroundRepeat: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  function handleHover(bool:boolean)
  {
    if(isIn)return setHover(bool)
    return ()=>null
  }

  const isKing = pos === "king"
  const responsive= "mob:text-[.5rem]"

  return (
    <div className="relative flex-1">
      {isKing && (
        <span className={`text-[#ffad00] absolute left-0 top-0 translate-y-[-100%] flex justify-center w-[100%] ${responsive}`}>
          <FontAwesomeIcon icon={faCrown} size="xl" />
        </span>
      )}
      <div
        className="w-[100%] h-[100%] relative"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <button
          {...myProps}
          onClick={handleShowPopup}
          type="button"
          className={`border-[2px] rounded-[.5rem] flex justify-center items-center w-full h-full ${
            isIn ? `${isKing?"border-[#ffad00]":"border-field"}`: `border-dotted border-[#fff]`
          }`}
          style={imgFavorite}
        >
          {!isIn && (
            <span className={`text-[#fff] ${responsive}`}>
              <FontAwesomeIcon icon={faPlusCircle} size="2xl" />
            </span>
          )}
        </button>
        {hover && (
          <div className="pointer-events-none absolute w-[100%] h-[100%] top-0 left-0">
            <div className="opacity-[.5] bg-[#000] absolute left-0 top-0 w-[100%] h-[100%]"></div>
            <div className={`absolute w-[100%] left-0 top-0 h-[100%] flex justify-center items-center z-[999] text-[#fff] ${responsive}`}>
              <FontAwesomeIcon icon={faArrowsRotate} size="4x" />
            </div>
          </div>
        )}
        {
          !cover&&isIn&&
          <div className="w-full h-full flex justify-center items-center text-text absolute left-0 top-0 pointer-events-none">
             <FontAwesomeIcon icon={faGamepad} size="2xl" />
          </div>
        }
      </div>
      {isIn && (
        <button
          className="absolute bottom-0 translate-y-[100%] left-0 text-text4 hover:text-[#fff]"
          type="button"
          onClick={handleDeletingFavorite}
        >
          Remove
        </button>
      )}
    </div>
  );
}