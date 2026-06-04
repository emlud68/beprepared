import { useState } from 'react'

function App() {
  const [newQuote, setNewQuote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    window.electron.ipcRenderer.send('new')
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="min-w-full">
          <div className="text-center">hello world</div>
          <textarea
            name="quote"
            id="quote"
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
          ></textarea>
          <button className="hover:cursor-pointer" type="submit" onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className="min-w-full h-28 bg-amber-400"></div>
      </div>
    </>
  )
}

export default App
