import React, { useEffect, useRef, useState } from 'react'

export default function useTextToggle({height}:{height:number}) 
{
    const[showButton,setShowButton]=useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false);
    const ref = useRef(null) 
    
    useEffect(()=>
    {
      if(ref.current===null)return
      const h = (ref.current as HTMLElement).offsetHeight
      if(h>height)setShowButton(true)
    },[])
      
    const toggleShowHandle=()=>
    {
      setShow(prev=>!prev)
    }

    const buttonLabel = show ? "Show Less" : "Show More"
    const lineClamp = showButton && !show ? "my-line-clamp" : ""

  return {ref,showButton,toggleShowHandle,buttonLabel,lineClamp}
}
