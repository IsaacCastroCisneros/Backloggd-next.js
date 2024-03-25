import { useRef,useEffect } from "react";

const useClickOutside = (callback: () => void) => 
{
    const ref = useRef<HTMLDivElement | null>(null);
    const opt = useRef<HTMLButtonElement | null>(null);
    
    const handleClickOutside = (event: MouseEvent) => 
    {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
      if(opt.current===event.target)
      {
        callback();
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [callback]);
  
    return {ref,opt};
}

export default useClickOutside