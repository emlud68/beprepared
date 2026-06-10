import { Conf } from 'electron-conf/main'

const userSettings = new Conf()

const getTimerPreference = () => {
  return userSettings.get('timer', false)
}

const setTimerPreference = (p) => {
  userSettings.set('timer', p)
}

const getFilterPreference = () => {
  return userSettings.get('filter', false)
}

const setFilterPreference = (c, p) => {
  userSettings.set(`filter.${c}`, p)
}

//Set default value if no user settings were yet set
if (!getTimerPreference()) {
  setTimerPreference(10 * 60000) //10 min in ms
}
if (!getFilterPreference()) {
  setFilterPreference('mary', true)
  setFilterPreference('literature', true)
  setFilterPreference('gospel', true)
  setFilterPreference('your', true)
}

export {
  userSettings,
  setTimerPreference,
  getTimerPreference,
  setFilterPreference,
  getFilterPreference
}
