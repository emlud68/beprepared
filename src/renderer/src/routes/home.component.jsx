import { Outlet, NavLink } from 'react-router'

function Home() {
  return (
    <div className="grid grid-cols-[1rem_minmax(0,1200px)_1rem] grid-rows-[1rem_auto_1fr_1rem] justify-center w-full max-h-screen h-full">
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-blue-400">
        <nav className="flex justify-center items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `bg-amber-200 text-black ${isActive ? 'opacity-50' : 'opacity-100'}`
            }
          >
            Preferences
          </NavLink>
          <NavLink
            to="quote"
            className={({ isActive }) =>
              `bg-amber-200 text-black ${isActive ? 'opacity-50' : 'opacity-100'}`
            }
          >
            Quote
          </NavLink>
          <NavLink
            to="yourquotes"
            className={({ isActive }) =>
              `bg-amber-200 text-black ${isActive ? 'opacity-50' : 'opacity-100'}`
            }
          >
            Your Quotes
          </NavLink>
        </nav>
      </div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-4overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
