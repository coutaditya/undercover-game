import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Homepage } from './pages/Homepage'
import { Gamepage } from './pages/Gamepage'

function App() {
  const [totalPlayers, setTotalPlayers] = useState(6)
  const [undercovers, setUndercovers] = useState(1)
  const [mrWhite, setMrWhite] = useState(1)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage 
        totalPlayers={totalPlayers}
        setTotalPlayers={setTotalPlayers}
        undercovers={undercovers}
        setUndercovers={setUndercovers}
        mrWhite={mrWhite}
        setMrWhite={setMrWhite}
        />} />
        <Route path="/game" element={<Gamepage 
        totalPlayers={totalPlayers}
        numberOfUndercover={undercovers}
        numberOfMrWhite={mrWhite}
        />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
