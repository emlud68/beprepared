import { useState, useEffect } from 'react'
import { Description, Field, Label, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const timers = {
  ten: 10,
  thirty: 30,
  hour: 60
}

const TimerPreference = () => {
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
    <Field className="w-[300px]">
      <Label className="text-md/6 font-medium text-black select-none">Notification Timer</Label>
      <Description className="text-sm/6 text-black/50 mt-2 select-none">
        Set the timer for getting quote notifications
      </Description>
      <div className="relative">
        <Select
          name="timerSelect"
          id="timerSelect"
          value={timerSelected}
          onChange={handleChange}
          className={clsx(
            'mt-3 block w-full appearance-none rounded-lg border-none bg-mauve-800/8 hover:cursor-pointer px-3 py-1.5 text-sm/6 text-black',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-mauve-800/35',
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
  )
}

export default TimerPreference
