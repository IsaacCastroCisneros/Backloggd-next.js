import React from 'react'

interface props 
{
  screenshot:string
}

export default function GradientBanner({screenshot}:props) 
{
  return (
    <div
        className={`w-[100%] absolute h-[450px] left-0 top-0 z-[-2] bg-no-repeat bg-cover `}
        style={{
          backgroundPosition: "center",
          backgroundImage: `url(${screenshot})`,
        }}
      >
        <div
          className="h-[262px] w-full z-[-1] absolute left-0 top-0"
          style={{
            background: "linear-gradient(0deg,transparent 2%,#16181c 109%)",
          }}
        ></div>
        <div
          className="h-[350px] w-full z-[-1] absolute left-0 bottom-0"
          style={{
            background: "linear-gradient(180deg,rgba(125,185,232,0) 0,#16181c)",
          }}
        ></div>
      </div>
  )
}
