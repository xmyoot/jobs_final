import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Form from './components/Form/Form.jsx'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/postJob' element={<Form />} />
      </Routes>
    </div>
  )
}
export default App