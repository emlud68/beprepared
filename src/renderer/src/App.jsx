import { Routes, Route } from 'react-router'
import Home from './routes/home.component'
import Preferences from './routes/preferences.component'
import EditQuotes from './components/edit-quotes/edit-quotes.component'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Preferences />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
