import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Button } from '@headlessui/react'

const QuoteViewer = () => {
  let { state } = useLocation()

  useEffect(() => {
    if (state?.quote) {
      sessionStorage.setItem('activeQuote', JSON.stringify(state.quote))
    }
  }, [state?.quote])

  const quote = state?.quote ?? JSON.parse(sessionStorage.getItem('activeQuote'))

  const handleGenerate = () => {
    window.electron.ipcRenderer.send('generate-random-quote')
    console.log('hi')
  }

  return (
    <div className="flex flex-col items-center mt-7">
      {quote ? (
        <div>
          <div className="max-w-[50em] text-center mt-8">
            <h1 className="text-5xl/14 font-serif">{quote.title}</h1>
          </div>
          <div className="max-w-[50em] mt-12">
            <p className="text-2xl/9 font-serif whitespace-break-spaces">{`"${quote.body}"`}</p>
          </div>
        </div>
      ) : (
        <h1 className="text-lg">No quote opened yet! Try generating a random quote</h1>
      )}
      <Button
        onClick={handleGenerate}
        className="mt-10 inline-flex items-center gap-2 rounded-md bg-blue-800/60 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-mauve-800/70 data-hover:bg-blue-800/75 hover:cursor-pointer"
      >
        Generate random Quote
      </Button>
    </div>
  )
}

export default QuoteViewer
