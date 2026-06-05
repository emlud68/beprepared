import { Outlet } from 'react-router'

function Home() {
  return (
    <div className="grid grid-cols-[1rem_minmax(0,1200px)_1rem] grid-rows-[1rem_auto_1fr_1rem] justify-center w-full max-h-screen h-full">
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-blue-400">hi</div>
      <div className="col-start-2 col-end-3 row-start-3 row-end-4 bg-amber-400 p-52 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
