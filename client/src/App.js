import './App.css';
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbaar/Newnav';
import MainComp from './components/home/MainComp';
import Footer from './components/footer/Footer';
import Sign_In from './components/signup_sign/Sign_In';
import Sign_Up from './components/signup_sign/Sign_Up';
import Cart from './components/cart/cart';
import Buynow from './components/buynow/Buynow';
import {Routes, Route} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 2000)
  },[])


  return (
<>
    {
      data ? (
        <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path="/" element={<MainComp />} />
        <Route path="/login" element={<Sign_In />} />
        <Route path="/register" element={<Sign_Up />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
    </>
      ) : (
        <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
        </div>
      )
    }

</>
  )
}

export default App;

