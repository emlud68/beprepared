/* eslint-disable react/prop-types */
const QuoteList = ({ quoteList }) => {
  const quotes = quoteList.map((quote) => (
    <li key={quote.id}>
      <h2 className="font-semibold mb-2">{quote.title}</h2>
      <p className="text-base mb-2">{quote.body}</p>
      <div className="text-sm mb-2">{quote.tag}</div>
      <div className="text-sm">quote id: {quote.id}</div>
    </li>
  ))

  return (
    <div>
      <ul>{quotes}</ul>
    </div>
  )
}

export default QuoteList
