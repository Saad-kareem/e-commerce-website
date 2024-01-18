import React, { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login';
import ErrorPage from './components/ErrorPage'
import AddProduct from './components/AddProduct'
import Cart from './components/Cart'

function App() {


  return (
    <>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route  path='/signup' element={<SignUp/>} />
            <Route  path='/login' element={<Login/>} />
            <Route  path='/add-products-by-saad_karim@' element={<AddProduct/>} />
            <Route  path='/cart' element={<Cart/>} />
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
