import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import Home from './routes/home.component'
import Preferences from './routes/preferences.component'
import QuoteViewer from './routes/quote-viwer.component'
import EditQuotes from './components/edit-quotes/edit-quotes.component'

function App() {
  let navigate = useNavigate()

  useEffect(() => {
    window.electron.ipcRenderer.on('notification-clicked', (_, quote) => {
      navigate('quote', { state: { quote } })
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('notification-clicked')
    }
  }, [navigate])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Preferences />} />
          <Route path="quote" element={<QuoteViewer />} />
          <Route path="yourquotes" element={<EditQuotes />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
