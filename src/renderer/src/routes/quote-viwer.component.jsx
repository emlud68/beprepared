import { useLocation } from 'react-router'
import { useEffect } from 'react'

const QuoteViewer = () => {
  let { state } = useLocation()

  useEffect(() => {
    if (state?.quote) {
      sessionStorage.setItem('activeQuote', JSON.stringify(state.quote))
    }
  }, [state?.quote])

  const quote = state?.quote ?? JSON.parse(sessionStorage.getItem('activeQuote'))

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
        <h1>no quote opened</h1>
      )}
    </div>
  )
}

export default QuoteViewer
