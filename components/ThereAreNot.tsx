import React from 'react'

export default function ThereAreNot({topic}:{topic:string}) 
{
  return (
  <span className="capitalize text-text2 block text-center text-[1.5rem]">there are no {topic}</span>
  )
}
