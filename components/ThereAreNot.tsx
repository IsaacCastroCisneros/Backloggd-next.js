import React from 'react'

export default function ThereAreNot({topic}:{topic:string}) 
{
  return (
  <span className="capitalize text-text2 block text-center text-[1.5rem] mob:text-[1.1rem]">there are no {topic}</span>
  )
}
