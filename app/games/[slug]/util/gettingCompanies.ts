import involved_company from "../interfaces/involved_company"

interface props
{
    companies:Array<involved_company>,
    param:keyof involved_company
}

const gettingCompanies = ({companies,param}:props)=>
{
   return companies.filter(com=>com[param]).map(com=>com.company).join(",")
}

export default gettingCompanies