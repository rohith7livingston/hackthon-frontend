import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import Voice from './components/Voice';
import './App.css'
function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={< Login/>} />
          <Route path="/home" element={< Home/>} />
          <Route path="/create-note" element={< CreateNote/>} />
          <Route path="/voice" element={< Voice/>} />

        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
