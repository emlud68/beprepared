import { useState, useEffect } from 'react'

const Preferences = () => {
  const [timerSelected, setTimerSelected] = useState('')
  useEffect(() => {
    window.electron.ipcRenderer.invoke('get-timer-preference').then(setTimerSelected)

    return () => {
      window.electron.ipcRenderer.removeAllListeners('get-timer-preference')
    }
  }, [])

  const timers = {
    ten: 10,
    thirty: 30,
    hour: 60
  }

  const handleChange = (e) => {
    setTimerSelected(e.target.value)
    const inMilliSeconds = timers[timerSelected] * 60000 // multiply by 1 minute in mms
    window.electron.ipcRenderer.send('set-timer-preference', inMilliSeconds)
  }
  return (
    <div>
      <div>
        <label htmlFor="timerSelect"></label>
        <select name="timerSelect" id="timerSelect" value={timerSelected} onChange={handleChange}>
          <option value="ten" selected="">
            10 Minutes
          </option>
          <option value="thiry">30 Minutes</option>
          <option value="tehourn">1 Hour</option>
        </select>
      </div>
    </div>
  )
}

export default Preferences
