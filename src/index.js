import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/login';/* 登录 */
import Home from './pages/home';/* 首页 */
import Door from "./components/use/door";
import Face from "./components/use/face";
import Prime from "./components/use/prime";
import Work from "./components/use/work";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} >
          <Route path='/home/prime' element={<Prime />} />
          <Route path='/home/door' element={<Door />} />
          <Route path='/home/face' element={<Face />} />
          <Route path='/home/work' element={<Work />} />
        </Route>
      </Route>

    </Routes>
    <App />
  </BrowserRouter>
);


//ReactDOM.render(<App />, document.getElementById("root"));
