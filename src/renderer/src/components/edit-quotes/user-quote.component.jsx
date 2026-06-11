/* eslint-disable react/prop-types */
import { useState } from 'react'
import clsx from 'clsx'
import { TrashIcon } from '@heroicons/react/20/solid'

const UserQuote = ({ id, title, body, handleDelete, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(id)}
      className="relative p-8 rounded-2xl border border-transparent hover:border-blue-900/20 hover:cursor-pointer"
    >
      <h2 className="font-semibold text-2xl mb-2 font-serif">{title}</h2>
      <p className="text-base/8 mb-2">{body}</p>
      <TrashIcon
        onClick={(e) => handleDelete(e, id)}
        className={clsx(
          'size-6 absolute top-5 right-4',
          isHovered ? 'block cursor-pointer' : 'hidden'
        )}
      />
    </li>
  )
}

export default UserQuote
