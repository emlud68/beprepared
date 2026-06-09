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
        <div className="min-w-full flex">
          <QuoteForm onCreate={handleCreate}></QuoteForm>
        </div>
        <div className="min-w-full">
          <QuoteList quoteList={quoteList}></QuoteList>
        </div>
      </div>
    </>
  )
}

export default EditQuotes
