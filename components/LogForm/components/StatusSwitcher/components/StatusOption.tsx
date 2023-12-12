import { Dispatch, ReactNode, SetStateAction } from "react"
import statusManager from "../interfaces/statusManger"
import myStatus from "../types/myStatus"
import { twMerge } from "tailwind-merge"

interface statusOption
{
  children:ReactNode
  color:string
  statusManager:statusManager
  status:myStatus
  setStatusManager:Dispatch<SetStateAction<statusManager>>
}

export default function StatusOption(props:statusOption)
{
  const{children,color,statusManager,status,setStatusManager}=props

  const isSelected = status=== statusManager.status ? "bg-gray":"hover:bg-gray5"

  return (
    <button
      type="button"
      className={twMerge(
        "py-[3px] px-[6px] border-border3 text-[#fff] flex items-center text-[14px] gap-[.2rem]",
        isSelected
      )}
      onClick={() =>
        setStatusManager((prev) => {
          return {
            ...prev,
            show: false,
            status,
            active: true,
            playing:false
          };
        })
      }
    >
      <span className={twMerge("w-[.3rem] h-[.3rem] block", color)}></span>
      {children}
    </button>
  );
}
