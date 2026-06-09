/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import UserQuote from './user-quote.component'
import ReactModal from 'react-modal'
import { Button, Field, Label, Description } from '@headlessui/react'

let userQuoteId

const QuoteList = ({ quoteList }) => {
  const [openModal, setOpenModal] = useState(false)

  let navigate = useNavigate()
  const handleOpen = (id) => {
    window.electron.ipcRenderer.invoke('get-quote', id).then((quote) => {
      navigate('/quote', { state: { quote } })
    })
  }

  const showModal = (e, id) => {
    e.stopPropagation()
    setOpenModal(true)
    userQuoteId = id
  }

  const handleDelete = (id) => {
    window.electron.ipcRenderer.invoke('delete-quote', id)
    setOpenModal(false)
  }

  const quotes = quoteList.map((quote) => (
    <UserQuote
      key={quote.id}
      id={quote.id}
      title={quote.title}
      body={quote.body}
      onDelete={showModal}
      onClick={handleOpen}
    />
  ))

  return (
    <div>
      <ul>{quotes}</ul>
      <ReactModal
        className="absolute top-1/12 left-[50%] translate-x-[-50%] w-full max-w-[400px] min-h-[25%] p-8 bg-white border border-gray-200 rounded-2xl flex flex-col"
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        contentLabel="Confirm Delete Modal"
      >
        <Field>
          <Label className="text-lg font-bold">Confirm Delete</Label>
          <Description className="mt-4">Are you sure you want to delete your Quote?</Description>

          <Button
            onClick={() => {
              handleDelete(userQuoteId)
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-yellow-400 data-hover:bg-red-800 data-open:bg-gray-700"
          >
            Confirm Delete
          </Button>
        </Field>
      </ReactModal>
    </div>
  )
}

export default QuoteList
