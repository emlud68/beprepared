/* eslint-disable react/prop-types */
import { useState } from 'react'
import clsx from 'clsx'
import { TrashIcon } from '@heroicons/react/20/solid'

const UserQuote = ({ title, body }) => {
  const [isHovered, setIsHovered] = useState(false)
  console.log(isHovered)
  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-8 rounded-2xl border border-transparent hover:border-blue-900/20"
    >
      <h2 className="font-semibold text-2xl mb-2 font-serif">{title}</h2>
      <p className="text-base/8 mb-2">{body}</p>
      <TrashIcon
        className={clsx('size-8 absolute top-5 right-6', isHovered ? 'block' : 'hidden')}
      />
    </li>
  )
}

export default UserQuote
