import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Editor from './pages/Editor/Editor'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  )
}

export default App
