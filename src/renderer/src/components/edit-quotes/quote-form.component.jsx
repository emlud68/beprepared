/* eslint-disable react/prop-types */
import { useState } from 'react'
import ReactModal from 'react-modal'
import { Button, Field, Input, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/20/solid'

const QuoteForm = ({ onCreate }) => {
  const [openModal, setOpenModal] = useState(false)
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')

  return (
    <>
      <Button
        onClick={setOpenModal}
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
      >
        Create new quote
      </Button>
      <ReactModal
        className="absolute top-1/12 left-[50%] translate-x-[-50%] w-full max-w-[800px] min-h-[70%] p-8 bg-white border border-gray-200 rounded-2xl flex flex-col"
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        contentLabel="New Quote Form"
      >
        <header className="relative">
          <h1 className="text-3xl font-medium max-w-[10em] text-center ml-auto mr-auto">
            Create Quote
          </h1>
          <XMarkIcon
            onClick={() => setOpenModal(false)}
            className="size-8 absolute top-0.5 right-4 hover:cursor-pointer"
          />
        </header>
        <br />
        <Field>
          <Label className="text-md/6 font-medium text-black">Quote Title</Label>
          <Input
            placeholder="Title"
            maxLength="120"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-mauve-800/5 px-3 py-1.5 text-sm/6 text-black',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-mauve-800/25'
            )}
          />
        </Field>
        <br />
        <Field>
          <Label className="text-md/6 font-medium text-black">Quote</Label>
          <Textarea
            placeholder="Quote"
            maxLength="2000"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-mauve-800/5 px-3 py-1.5 text-sm/6 text-black',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-mauve-800/25'
            )}
            rows={4}
          />
        </Field>
        <br />
        <Button
          onClick={() => {
            onCreate({ title, body, tag: 'your' })
            setTitle('')
            setBody('')
            setOpenModal(false)
          }}
          className="self-start inline-flex mt-auto items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-mauve-400 data-hover:bg-gray-600 data-open:bg-gray-700"
        >
          Create new Quote
        </Button>
      </ReactModal>
    </>
  )
}

export default QuoteForm
