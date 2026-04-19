import React from 'react'
import Navbar from './components/Navbar'
import Check from './components/Ytsection'
import Footer from './components/Footer'
import Home from './pages/Home'
import {Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import EduNotes from './pages/EduNotes'

const App = () => {
  return (
    <div >
      <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/edunotes' element={<EduNotes/>}/>
      </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
