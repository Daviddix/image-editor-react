import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Editor from './pages/Editor/Editor'
import {atom} from "jotai"
import { Flipper } from 'react-flip-toolkit'

function App() {
  const countAtom = atom(0)

  return (
    <Routes>
      <Route path="/" element={<Flipper><Homepage /></Flipper>} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  )
}

export default App
