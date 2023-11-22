import './App.css'
// import Home from './pages/home';
// import Login from './pages/login';
// import BaseRouter from './routes';
import React, { Component } from 'react';
import { Outlet} from 'react-router-dom';
function App() {

  return (
    <div>
      
      < Outlet />
    </div>
  );
}

export default App;
