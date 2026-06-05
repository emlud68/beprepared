import { useState, useEffect } from 'react'
import QuoteForm from './components/quote-form.component'
import DeleteQuoteForm from './components/delete-quote-form.component'
import QuoteList from './components/quote-list.component'

function App() {
  const [quoteList, setQuoteList] = useState([])

  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-quotes').then(setQuoteList)

    window.electron.ipcRenderer.on('update-quotes', (_, updated) => {
      setQuoteList(updated)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('update-quotes')
    }
  }, [])

  const handleCreate = (quote) => {
    window.electron.ipcRenderer.invoke('new-quote', quote)
  }

  const handleDelete = (id) => {
    window.electron.ipcRenderer.invoke('delete-quote', id)
  }

  console.log(quoteList)

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="min-w-full flex">
          <QuoteForm onCreate={handleCreate}></QuoteForm>
          <DeleteQuoteForm onDelete={handleDelete}></DeleteQuoteForm>
        </div>
        <div className="min-w-full bg-amber-400">
          <QuoteList quoteList={quoteList}></QuoteList>
        </div>
      </div>
    </>
  )
}

export default App
