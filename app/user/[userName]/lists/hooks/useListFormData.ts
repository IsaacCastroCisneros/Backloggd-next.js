import { FormEvent, useEffect, useState } from 'react'
import listItem from '../interfaces/listItem';


export default function useListFormData(initialList:Array<listItem>=[]) 
{
    const[lists,setList]=useState<Array<listItem>>([])

    useEffect(()=>
    {
      if(initialList.length>0)
      {
         setList(initialList)
      }
    },[])
    
 
    function handleDeleteItemList(id: string) 
    {
      const newList = [...lists];

      setList(newList.filter((item) => item.listId !== id));
    }

    function submit(e:FormEvent<HTMLFormElement>)
    {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const slug = name.toLowerCase().split(" ").join("-");
      const data = Object.fromEntries(formData) as {
        description: string;
        name: string;
        slug: string;
      };

      return {...data,slug} 
    }

    return {handleDeleteItemList,setList,lists,submit}
}
