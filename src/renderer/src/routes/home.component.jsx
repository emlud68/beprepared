import { Outlet } from 'react-router'
import logo from '../assets/logo.png'

function Home() {
  return (
    <div className="grid grid-cols-[1rem_minmax(0,1200px)_1rem] grid-rows-[1rem_auto_1fr_1rem] justify-center w-full max-h-screen h-full">
      <div className="col-start-2 col-end-3 row-start-2 row-end-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-20">
          <div className="max-w-[calc(100vh_/_3)]">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="text-5xl font-sans">Be Prepared</h1>
        </div>
      </div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-4 bg-amber-400 p-52 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
