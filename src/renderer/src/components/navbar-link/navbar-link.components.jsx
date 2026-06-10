/* eslint-disable react/prop-types */
import { NavLink } from 'react-router'

const NavbarLink = ({ to }) => {
  let header
  if (to === 'quote') {
    header = 'Quote'
  } else if (to === 'yourquotes') {
    header = 'Your Quotes'
  } else {
    header = 'Preferences'
  }
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-1 rounded-sm bg-gray-200 text-mauve-700 select-none ${isActive ? 'opacity-70 cursor-default' : 'opacity-100'}`
      }
    >
      {header}
    </NavLink>
  )
}

export default NavbarLink
