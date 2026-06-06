import { useLocation } from 'react-router'

const QuoteViewer = () => {
  const { state } = useLocation()
  const quote = state?.quote ?? null
  return (
    <div className="flex flex-col items-center">
      {quote ? (
        <div>
          <div className="max-w-[34em] mt-8">
            <h1 className="text-4xl">{quote.title}</h1>
          </div>
          <div className="max-w-[34em] mt-8">
            <p className="text-2xl whitespace-break-spaces">{quote.body}</p>
          </div>
        </div>
      ) : (
        <h1>no quote opened</h1>
      )}
    </div>
  )
}

export default QuoteViewer
