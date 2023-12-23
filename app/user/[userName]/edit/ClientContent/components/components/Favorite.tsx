"use client"

import { ButtonHTMLAttributes, useContext } from "react";
import { context } from "../../context/context";
import favorite from "../../interfaces/favorite";

interface props extends ButtonHTMLAttributes<HTMLButtonElement>
{
   favorite:favorite
}

export default function Favorite(props:props)
{
  const{favorite,...myProps}=props
  const{isIn,pos,cover}=favorite
  const{showPopup,updateFavorites}=useContext(context)

  function handleShowPopup()
  {
    if(isIn)return
    showPopup(pos)
  }

  function handleDeletingFavorite()
  {
    updateFavorites({
      pos,
      isIn: false,
      id: "",
      cover: "",
    });
  }

  const imgFavorite=
  {
    backgroundImage: isIn ? `url(${cover})` : "",
    backgroundRepeat: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  return (
    <div className="relative flex-1">
      <button
        {...myProps}
        onClick={handleShowPopup}
        type="button"
        className={`border-[2px] rounded-[.5rem] w-full h-full ${isIn ? "pointer-events-none border-field" : "pointer-events-auto border-dotted border-[#fff]"}`}
        style={imgFavorite}
      ></button>
      {isIn && (
        <button className="absolute bottom-0 translate-y-[100%] left-0 text-text4 hover:text-[#fff]" onClick={handleDeletingFavorite}>
          Remove
        </button>
      )}
    </div>
  );
}