import choosingImgSize from '@/app/games/search/components/Results/util/choosingImgSize';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ImgHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface props extends ImgHTMLAttributes<HTMLImageElement>
{
  notFoundStyles?:string
  isResponsive?:boolean
}

export default function CardPic(myProps:props) 
{
  const{src,height=123,width=90,notFoundStyles}=myProps
  const imgSrc=src && choosingImgSize({url:src,size:"cover_big"})

  return (
    <>
      {src && <Pic {...myProps} src={imgSrc} />}
      {!src && (
        <div className={twMerge("relative w-fit h-fit",notFoundStyles)}>
          <Pic
            {...myProps}
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

  const{className="",height=134.28,width=90,src,isResponsive=true,...props}=myProps

  return (
    <>
      {isResponsive && (
        <div
          {...props}
          className={twMerge(
            "relative rounded-[4px] border-field border-[1px] hover:border-gray bg-bg overflow-hidden",
            className
          )}
        >
          <img
            height={height}
            width={width}
            className={`object-cover opacity-0 min-h-[134.28px] min-w-[90px]`}
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co4ahr.jpg"
            alt=""
          />
          <div className="absolute left-0 top-0 h-full w-full flex items-center">
            <img
              alt="game cover"
              height={height}
              width={width}
              src={src}
              className="object-cover"
            />
          </div>
        </div>
      )}
      {!isResponsive && (
        <img
          {...props}
          src={src}
          alt="game cover"
          height={height}
          width={width}
          className={twMerge(
            `object-cover rounded-[4px] min-h-[134.28px] min-w-[90px] border-field border-[1px] hover:border-gray`,
            className
          )}
        />
      )}
    </>
  );
}