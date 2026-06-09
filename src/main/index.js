import { app, BrowserWindow, ipcMain, Menu, Notification, Tray } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow
let tray
const gotLock = app.requestSingleInstanceLock()
if (!gotLock) app.quit()

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.show()
    mainWindow.focus()
  }
})

app.on('window-all-closed', (e) => e.preventDefault())

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('close', (e) => {
    e.preventDefault()
    mainWindow.hide()
  })
}

//Database imports
import * as db from './db'

//Electron Store imports
import {
  setTimerPreference,
  getTimerPreference,
  setFilterPreference,
  getFilterPreference
} from './user-settings'

function createTray() {
  // Create system tray icon
  tray = new Tray(icon)

  tray.setToolTip('Be Prepared')
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Send Test Notification', click: sendNotification },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => {
          mainWindow.destroy()
          app.quit()
        }
      }
    ])
  )

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true // macOS: starts silently
  })
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.beprepared')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  function updateQuotes() {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const quotes = db.getAllQuotes()
      mainWindow.webContents.send('update-quotes', quotes)
    }
  }

  ipcMain.handle('get-quotes', () => {
    const quotes = db.getAllQuotes()
    return quotes
  })
  ipcMain.handle('get-quote', (_, id) => {
    const quote = db.getQuoteFromId(id)
    return quote
  })
  ipcMain.handle('new-quote', (_, quote) => {
    db.createQuote(quote.title, quote.body, quote.tag)
    updateQuotes()
  })
  ipcMain.handle('delete-quote', (_, id) => {
    db.deleteQuote(id)
    updateQuotes()
  })
  ipcMain.on('set-timer-preference', (_, p) => {
    setTimerPreference(p)
    initiateNotificationScheduler()
  })
  ipcMain.handle('get-timer-preference', getTimerPreference)
  ipcMain.on('set-filter-preference', (_, c, p) => {
    setFilterPreference(c, p)
  })
  ipcMain.handle('get-filter-preference', getFilterPreference)

  createWindow()
  createTray()
  initiateNotificationScheduler()

  app.on('activate', () => {
    mainWindow.show()
  })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// --
function sendNotification(quote) {
  const notification = new Notification({
    title: quote.title,
    body: quote.body,
    icon
  })

  notification.on('click', () => {
    if (mainWindow) {
      mainWindow.show()
      mainWindow.focus()
    }

    mainWindow.webContents.send('notification-clicked', quote)
  })

  notification.show()
}

let interval

function startNotificationScheduler(timer) {
  interval = setInterval(() => {
    const quote = db.db.prepare('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1').get()
    mainWindow.webContents.send('notification-clicked', quote)
    sendNotification(quote)
  }, timer)
}

function stopNotificationScheduler() {
  clearInterval(interval)
}

function initiateNotificationScheduler() {
  if (interval) {
    stopNotificationScheduler()
  }
  let timer = getTimerPreference()
  if (!timer) {
    timer = 600000 // in case, default to 10 min
    setTimerPreference(600000)
  }
  startNotificationScheduler(timer)
}
