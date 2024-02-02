import { faBook, faEllipsisH, faEllipsisVertical, faGamepad, faListDots, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from './components/Button/Button';

export default function Menu() {
  return (
    <div className="rounded-[5px] bg-border2 border-gray border-[1px] px-[1rem] flex justify-between gap-[.5rem] z-[9]">
      <Button label='Played' icon={faGamepad} />
      <Button label='Playing' icon={faPlay} />
      <Button label='more' icon={faEllipsisH} isMenu/>
    </div>
  );
}



