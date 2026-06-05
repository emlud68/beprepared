import __Store from 'electron-store'

//https://github.com/sindresorhus/electron-store/issues/289
const userSettings = __Store.default || __Store

export const setTimerPreference = (p) => {
  userSettings.set('timer', p)
}

export const getTimerPreference = () => {
  return userSettings.get('timer')
}
