import { useState, useEffect } from 'react'
import QuoteForm from './quote-form.component'
import QuoteList from './quote-list.component'

function EditQuotes() {
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

  console.log(quoteList)

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="min-w-full mb-8 mt-8 relative">
          <QuoteForm onCreate={handleCreate}></QuoteForm>
          <h1 className="absolute top-0.5 left-1/2 -translate-x-1/2 text-2xl font-sans">
            Your Quotes
          </h1>
        </div>
        <div className="min-w-full">
          {quoteList.length === 0 ? (
            <h1 className="text-lg mt-10">Try adding your own quotes!</h1>
          ) : (
            <QuoteList quoteList={quoteList}></QuoteList>
          )}
        </div>
      </div>
    </>
  )
}

export default EditQuotes
