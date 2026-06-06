import { Conf } from 'electron-conf/main'

const userSettings = new Conf()

const getTimerPreference = () => {
  return userSettings.get('timer', false)
}

const setTimerPreference = (p) => {
  userSettings.set('timer', p)
}

//Set default value if no user settings were yet set
// userSettings.clear()
if (!getTimerPreference) {
  setTimerPreference(10 * 60000) //10 min in ms
}

export { userSettings, setTimerPreference, getTimerPreference }
