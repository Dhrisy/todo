import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from "./components/signup/Signup"
import Login from "./components/login/Login"
import Home from './components/home/Home'

function App() {
  // const [count, setCount] = useState(0)
  const _token = localStorage.getItem('token');
  console.log(`${localStorage.getItem('token')}`);
  // const [state, setState] = useState("")
  return (
    <div>
      {_token === "" || _token === null ? <Login/> : <Home/>}
     
    </div>
  )
}

export default App
