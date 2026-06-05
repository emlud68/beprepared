import Store from 'electron-store'

const userSettings = Store()

export const setTimerPreference = (p) => {
  userSettings.set('timer', p)
}
