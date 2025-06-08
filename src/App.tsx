import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Homepage } from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
