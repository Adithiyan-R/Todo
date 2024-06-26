import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Todo from './pages/todo';
import Signup from './pages/signup';
import Login from './pages/login';
import Update from './pages/update';
import Navbar from './pages/navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Todo/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/update/:id' element={<Update/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;