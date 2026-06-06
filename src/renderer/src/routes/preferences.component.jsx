import { useState, useEffect } from 'react'
import { Description, Field, Label, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import logo from '../assets/logo.png'

const timers = {
  ten: 10,
  thirty: 30,
  hour: 60
}

const Preferences = () => {
  const [timerSelected, setTimerSelected] = useState('')
  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-timer-preference').then((p) => {
      const key = Object.keys(timers).find((key) => timers[key] === p / 60000)
      setTimerSelected(key)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('get-timer-preference')
    }
  }, [])

  const handleChange = (e) => {
    const selected = e.target.value
    setTimerSelected(selected)
    const inMilliSeconds = timers[selected] * 60000 // multiply by 1 minute in ms
    window.electron.ipcRenderer.send('set-timer-preference', inMilliSeconds)
  }
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-20">
        <div className="max-w-[calc(100vh_/_3)]">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="text-5xl font-sans">Be Prepared</h1>
      </div>
      <div>
        <Field>
          <Label className="text-sm/6 font-medium text-black">Project status</Label>
          <Description className="text-sm/6 text-black/50">
            This will be visible to clients on the project.
          </Description>
          <div className="relative">
            <Select
              name="timerSelect"
              id="timerSelect"
              value={timerSelected}
              onChange={handleChange}
              className={clsx(
                'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-black',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                // Make the text of each option black on Windows
                '*:text-black'
              )}
            >
              <option className="p-8" value="ten">
                10 Minutes
              </option>
              <option value="thirty">30 Minutes</option>
              <option value="hour">1 Hour</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>
    </div>
  )
}

export default Preferences
