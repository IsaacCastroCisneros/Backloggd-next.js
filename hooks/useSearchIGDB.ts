import gameCardData from "@/interfaces/gameCardData"
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { ChangeEvent, useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"

interface finalResults
{
  results:Array<gameCardData>
  status:"isLoading"|boolean
}

export default function useSearchIGDB() 
{
    const[finalResults,setFinalResults]=useState<finalResults>({status:false,results:[]})
    const[game,setGame]=useState<string>("")
    const {data} = useQuery(["search",game],myRequest)
    const queryClient = useQueryClient()

    const{status}=finalResults
  
    async function myRequest({signal}:any)
    {
      if(status==="isLoading")
      {
        queryClient.cancelQueries(game)
      }
      if(game==="")return 
      setFinalResults(prev=>({...prev,status:"isLoading"}))
      const response =await fetch(`/api/igdb/${game}`,{signal})
      setFinalResults(prev=>({...prev,status:true}))
      const {res} = await response.json()
      
      return res
    }
  
    async function handleSearch(e:ChangeEvent<HTMLInputElement>)
    {
      const game=e.target.value
      if(game==="")return
      setGame(game)
    }
  
    useEffect(()=>
    { 
      if(game==="")return
      setFinalResults({status:true,results:data||[]}) 
    },[data])
  
    const loadingIcon:FontAwesomeIconProps= status==="isLoading" ? {icon:faSpinner,spin:true} :{icon:faMagnifyingGlass,spin:false} 

    return{
        handleSearch,
        loadingIcon,
        finalResults,
        data,
        game
    }
}
