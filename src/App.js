import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Played from './pages/played/Played';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './data/firebase';
import { ToastContainer } from 'react-toastify';
import Detail from './pages/detail/Detail';
import Explorar from './pages/explorer/Explorar';
import MyList from './pages/mylist/MyList';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <div className="App">
        <ToastContainer theme='dark'/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/explore' element={<Explorar/>}/>
          <Route path='/mi-lista' element={<MyList/>}/>
          <Route path='/play/:id' element={<Played/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
        </Routes>
      </div>
  );
}

export default App;
