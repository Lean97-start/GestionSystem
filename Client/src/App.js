import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home/Home';

function App() {
  console.log("HOLA")
  return (
      <div className='App'>
        <BrowserRouter>
            <Routes>
              <Route exact path={'/'} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
