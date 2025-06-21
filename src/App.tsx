import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import { Gamepage } from './pages/Gamepage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<Gamepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
