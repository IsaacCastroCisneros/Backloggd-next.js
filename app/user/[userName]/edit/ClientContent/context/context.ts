import { createContext } from "react";
import cardPosition from "../types/cardPosition";
import favorite from "../interfaces/favorite";

export interface context
{
  showPopup:(pos:cardPosition)=>void
  favorites:Array<favorite>
  updateFavorites:(newFavorite:favorite)=>void
}

export const context=createContext<context>(
    {
      showPopup:()=>null,
      favorites:[],
      updateFavorites:()=>null
    })