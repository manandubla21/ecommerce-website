import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home.jsx'
import Collection from './pages/collection.jsx'
import Cart from './pages/cart.jsx'
import Contact from './pages/contact.jsx'
import About from './pages/about.jsx'
import Login from './pages/login.jsx'
import Orders from './pages/orders.jsx'
import PlaceOrders from './pages/placeOrder.jsx'
import Product from './pages/product.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify.jsx'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/place-order' element={<PlaceOrders/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App