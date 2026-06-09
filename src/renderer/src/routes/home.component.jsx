import { Outlet } from 'react-router'
import NavbarLink from '../components/navbar-link/navbar-link.components'

function Home() {
  return (
    <div className="grid grid-cols-[1rem_minmax(0,1200px)_1rem] grid-rows-[1rem_auto_1fr_1rem] justify-center w-full max-h-screen h-full">
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <nav className="flex justify-center items-center gap-4">
          <NavbarLink to="/" />
          <NavbarLink to="quote" />
          <NavbarLink to="yourquotes" />
        </nav>
      </div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-4 overflow-auto pt-8 pb-8 scrollbar-auto scrollbar-thumb-blue-800/40 hover:scrollbar-thumb-blue-800/30">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
