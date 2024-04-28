import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import Content from './components/Content'

interface props
{
    icon:IconProp
    label:string
    href?:string
    onClick?:()=>void
}

export default function MobOption(props:props) 
{
  const{icon,label,href="",onClick}=props

  const styles = 'flex gap-[.3rem] bg-gray w-full rounded-[.3rem] text-text2 capitalize px-[.5rem] text-[14px] mob1:text-[12px] py-[.2rem] items-center font-medium justify-center'

  return (
    <li className="flex-1">
      {!onClick && (
        <Link href={href} className={styles}>
          <Content icon={icon} label={label} />
        </Link>
      )}
      {onClick && (
        <button className={styles}>
          <Content icon={icon} label={label} />
        </button>
      )}
    </li>
  );
}


