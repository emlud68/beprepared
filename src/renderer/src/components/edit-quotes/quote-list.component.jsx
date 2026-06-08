/* eslint-disable react/prop-types */
import UserQuote from './user-quote.component'

const QuoteList = ({ quoteList }) => {
  const quotes = quoteList.map((quote) => (
    <UserQuote key={quote.id} title={quote.title} body={quote.body} />
  ))

  return (
    <div>
      <ul>{quotes}</ul>
    </div>
  )
}

export default QuoteList
