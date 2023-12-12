"use client"
import React,{useState,useEffect} from 'react'

export default function useErrLIst({schema,values}:{schema:any,values:Record<any,any>}) 
{
    const[errList,setErrList]=useState<null|Record<any,any>>()
    const errors:any = {}

    useEffect(()=>
    {
        const { error } = schema.validate(values, { abortEarly: false }) 
        console.log(error)
        if(error===undefined)return setErrList(null)
    
        error?.details.forEach((err:any)=>
            {
               errors[err.path]=err.message
            })
        setErrList(errors)
    },[values])

  
    return errList
}
