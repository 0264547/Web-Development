import React from 'react';
import Description from './components/Description';
import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
import {Routes, Route,Navigate} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App"> 
      <AppNavbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/description' element={<Description/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;