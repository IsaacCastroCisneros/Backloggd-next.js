import React from 'react'
import Link from 'next/link'

export default function LoginForLogLink() {
  return (
    <Link
      href="/users/login"
      className="font-medium text-[#fff] px-[.7rem] py-[.3rem] block rounded-[.2rem] duration-200 relative hover:brightness-[150%] bg-myPink"
    >
      Login for log
    </Link>
  );
}
