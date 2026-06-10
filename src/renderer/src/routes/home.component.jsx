import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { XMarkIcon } from '@heroicons/react/20/solid'
import NavbarLink from '../components/navbar-link/navbar-link.components'

function Home() {
  const [error, setError] = useState(null)
  useEffect(() => {
    window.electron.ipcRenderer.on('error', (_, msg) => {
      setError(msg)
      setTimeout(() => setError(null), 4000) // clears after 4s
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('error')
    }
  }, [])
  return (
    <div className="grid grid-cols-[1rem_minmax(0,1200px)_1rem] grid-rows-[1rem_auto_1fr_1rem] justify-center w-full max-h-screen h-full">
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <nav className="flex justify-center items-center gap-4">
          <NavbarLink to="/" />
          <NavbarLink to="quote" />
          <NavbarLink to="yourquotes" />
        </nav>
      </div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-4 overflow-auto pt-8 pb-8 scrollbar-auto [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:bg-indigo-200">
        {error && (
          <div className="p-2.5 bg-red-700 text-white text-center relative">
            {error}
            <XMarkIcon
              onClick={() => setError(null)}
              className="size-8 absolute top-1.5 right-4 hover:cursor-pointer"
            />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default Home
