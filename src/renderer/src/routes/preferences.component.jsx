import { useState, useEffect } from 'react'

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
      <div>
        <label htmlFor="timerSelect"></label>
        <select name="timerSelect" id="timerSelect" value={timerSelected} onChange={handleChange}>
          <option value="ten">10 Minutes</option>
          <option value="thirty">30 Minutes</option>
          <option value="hour">1 Hour</option>
        </select>
      </div>
    </div>
  )
}

export default Preferences
