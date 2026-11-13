import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HeaderCard from './components/PageStructure/header/HeaderCard'
import Play from './Pages/Authenticated/Play'
import Menu from './components/PageStructure/menu/Menu'

function App() {
  return (
    <BrowserRouter>
      <HeaderCard
        headerInfo={{
          nom: 'Gerard',
          data: new Date().toLocaleString('ca-ES')
        }}
      />
      <Menu />
      <Routes>
        <Route path="/Play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App