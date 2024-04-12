import React, { useEffect, useRef, useState } from 'react'

export default function useTextToggle({height}:{height:number}) 
{
    const[showButton,setShowButton]=useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false);
    const ref = useRef(null) 

    const toggleShowHandle=()=>
        {
          setShow(prev=>!prev)
        }

    useEffect(()=>
    {
        if(ref.current===null)return
        const h = (ref.current as HTMLElement).offsetHeight
        if(h>height)setShowButton(true)
    },[])
    
    const buttonLabel = show ? "Show Less" : "Show More"
    const lineClamp = showButton && !show ? "line-clamp-5" : ""

  return {ref,showButton,toggleShowHandle,buttonLabel,lineClamp}
}
