import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import CreateDocument from './Components/Documents/createDocument';


function App() {
  return (
      <div className='App'>
        <BrowserRouter>
            <Routes>
              <Route exact path={'/'} element={<Home/>}/>
              <Route exact path={'/createDocument'} element={<CreateDocument/> }/>
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
