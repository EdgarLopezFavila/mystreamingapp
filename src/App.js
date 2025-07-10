import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Played from './pages/played/Played';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './data/firebase';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })
  }, []);
  return (
      <div className="App">
        <ToastContainer theme='dark'/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/play/:id' element={<Played/>}/>
        </Routes>
      </div>
  );
}

export default App;
