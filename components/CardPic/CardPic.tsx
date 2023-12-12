import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends ImgHTMLAttributes<HTMLImageElement>
{}

export default function CardPic(myProps:props) 
{

   const{src,height=123,width=90}=myProps
   const imgSrc=src ?  choosingImgSize({url:src,size:"cover_big"}):undefined

  return (
    <>
      {src && <Pic {...myProps} src={imgSrc} />}
      {!src && (
        <div className="relative w-fit h-fit">
          <Pic
            height={height}
            width={width}
            src="/img/no_image-eee1d555ae021e9cf0ca691c0e9ec60a.jpg"
          />
          <div className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-text pointer-events-none">
            <FontAwesomeIcon icon={faGamepad} size='xl' />
          </div>
        </div>
      )}
    </>
  );
}


function Pic(myProps:props)
{

  const{className="",height=123,width=90,...props}=myProps

  const styles=`min-h-[${height}px] min-w-[${width}px]`

  return (
    <img
      {...props}
      alt="game cover"
      height={height}
      width={width}
      className={twMerge(
        `object-cover rounded-[4px] mob1:min-h-[initial] ${styles} mob1:min-w-[initial] border-field border-[1px] hover:border-gray`,
        className
      )}
    />
  );
}