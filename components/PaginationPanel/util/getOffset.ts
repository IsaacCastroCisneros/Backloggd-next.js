export default function getOffset(n:number,maxByPage:number)
{
   const myN = Number(n)
   if(myN===1)return 0

   return (myN*maxByPage)-maxByPage
}