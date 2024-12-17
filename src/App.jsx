import React, { useEffect } from 'react'
// import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from'./pages/Home/Home.jsx'
import { Routes,Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import{auth} from './firebase.js'

const App = () => {

  const navigate=useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log("logged In");
        navigate('/');
      }
      else{
        console.log("logged Out");
        navigate('/login');
        
      }
    })
  },[])

  return (
    
    <div>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
      <ToastContainer theme='dark'/>
    </div>

  )
}

export default App
