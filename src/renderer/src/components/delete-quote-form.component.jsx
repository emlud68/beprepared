/* eslint-disable react/prop-types */
import { useState } from 'react'

const DeleteQuoteForm = ({ onDelete }) => {
  const [id, setId] = useState(-1)
  return (
    <div className="w-[50%] flex flex-col mr-auto ml-auto">
      <input
        className="border"
        type="number"
        name="id"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button className="hover:cursor-pointer" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  )
}

export default DeleteQuoteForm
