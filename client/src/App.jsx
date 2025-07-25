import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Footer from './components/Footer'
const App = () => {

  
  return (
    <div className='px-4 sm:px-14 lg:px-28 min-h-screen bg-gradient-to-b from bg-teal-50 to-pink-200 '> 

   
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/result' element={<Result/>} />
      <Route path='/buy' element={<BuyCredit/>} />
      
      
    </Routes>
    
    <Footer/>
    </div>
  )
}

export default App