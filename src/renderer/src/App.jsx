import { Routes, Route } from 'react-router'
import Home from './routes/home.component'
import EditQuotes from './components/edit-quotes/edit-quotes.component'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<EditQuotes />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
