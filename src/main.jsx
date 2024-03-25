import React from 'react'
// import ReactDOM from 'react-dom/client'
import  ReactDOM  from 'react-dom'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login.jsx'
import Signup from './components/signup/Signup.jsx'
import Home from './components/home/Home.jsx'


const root = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const rootElement = ReactDOM.createRoot(root);

rootElement.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/submit' element={<Home />} />
    </Routes>
  </Router>
);


// const root = document.getElementById('root');

// // Use createRoot instead of ReactDOM.render
// const rootElement = ReactDOM.createRoot(root);

// rootElement.render(
//   <Router>
//     <Routes>
//       <Route path='/' element={<App />} />
//       <Route path='/?' element={<Home />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/signup' element={<Signup />} />
//       <Route path='/home' element={<Home />} />
//       <Route path='/submit' element={<Home />} />
//     </Routes>
//   </Router>
// );