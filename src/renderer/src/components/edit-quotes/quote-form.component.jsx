/* eslint-disable react/prop-types */
import { useState } from 'react'

const QuoteForm = ({ onCreate }) => {
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')

  return (
    <div className="w-[50%] flex flex-col mr-auto ml-auto">
      <input
        className="border"
        type="text"
        name="title"
        id="title"
        placeholder="Quote Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border"
        name="body"
        id="body"
        placeholder="Quote Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <input
        className="border"
        type="text"
        name="tag"
        id="tag"
        placeholder="Quote Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <button className="hover:cursor-pointer" onClick={() => onCreate({ title, body, tag })}>
        Create
      </button>
    </div>
  )
}

export default QuoteForm
