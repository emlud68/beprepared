import { useState, useEffect } from 'react'
import { Field, Label, Switch } from '@headlessui/react'

const FilterPreference = () => {
  const [maryQuotes, setMaryQuotes] = useState(true)
  const [literatureQuotes, setLiteratureQuotes] = useState(true)
  const [gospelQuotes, setGospelQuotes] = useState(true)
  const [yourQuotes, setYourQuotes] = useState(true)

  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-filter-preference').then((filter) => {
      setMaryQuotes(filter.mary)
      setLiteratureQuotes(filter.literature)
      setGospelQuotes(filter.gospel)
      setYourQuotes(filter.your)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('get-timer-preference')
    }
  }, [])

  const handleChange = (c) => {
    let value
    if (c === 'mary') {
      value = !maryQuotes
      setMaryQuotes(value)
      window.electron.ipcRenderer.send('set-filter-preference', 'mary', value)
    } else if (c === 'literature') {
      value = !literatureQuotes
      setLiteratureQuotes(value)
      window.electron.ipcRenderer.send('set-filter-preference', 'literature', value)
    } else if (c === 'gospel') {
      value = !gospelQuotes
      setGospelQuotes(value)
      window.electron.ipcRenderer.send('set-filter-preference', 'gospel', value)
    } else {
      value = !yourQuotes
      setYourQuotes(value)
      window.electron.ipcRenderer.send('set-filter-preference', 'your', value)
    }
  }

  return (
    <div className="inline-flex flex-col w-fit">
      <Field className="inline-flex items-center justify-start gap-4">
        <Label>Mary Quotes</Label>
        <Switch
          checked={maryQuotes}
          onChange={() => handleChange('mary')}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-mist-900/40 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-800/40 data-focus:outline data-focus:outline-mauve-800/70"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
          />
        </Switch>
      </Field>
      <Field className="inline-flex items-center justify-start gap-4 mt-4">
        <Label>Literature Quotes</Label>
        <Switch
          checked={literatureQuotes}
          onChange={() => handleChange('literature')}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-mist-900/40 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-800/40 data-focus:outline data-focus:outline-mauve-800/70"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
          />
        </Switch>
      </Field>
      <Field className="inline-flex items-center justify-start gap-4 mt-4">
        <Label>Gospel Quotes</Label>
        <Switch
          checked={gospelQuotes}
          onChange={() => handleChange('gospel')}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-mist-900/40 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-800/40 data-focus:outline data-focus:outline-mauve-800/70"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
          />
        </Switch>
      </Field>
      <Field className="inline-flex items-center justify-start gap-4 mt-4">
        <Label>Your Quotes</Label>
        <Switch
          checked={yourQuotes}
          onChange={() => handleChange('your')}
          className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-mist-900/40 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-800/40 data-focus:outline data-focus:outline-mauve-800/70"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
          />
        </Switch>
      </Field>
    </div>
  )
}

export default FilterPreference
