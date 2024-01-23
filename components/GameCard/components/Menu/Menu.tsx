import { faBook, faEllipsisH, faEllipsisVertical, faGamepad, faListDots, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from './components/Button';

export default function Menu() {
  return (
    <div className="rounded-[5px] bg-border2 border-gray border-[1px] px-[1rem] flex justify-between gap-[.5rem]">
      <Button label='Played' icon={faGamepad} />
      <Button label='Playing' icon={faPlay} />
      <Button label='more' icon={faEllipsisH} />
    </div>
  );
}



