import React from 'react'

export default async function page() 
{
  
    await new Promise((res,rej)=>
        {
          setTimeout(() => {
            res('¡Promesa cumplida después de 5 segundos!');
          }, 5000); 
        })
        return null
}
