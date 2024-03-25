import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import "./Login.scss"
import MainImage from "../../assets/mainimage.png"
import { auth, db } from '../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../loading';
// import { navigate } from '../../route';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';


function Login() {
  const [loginEmail, setEmail] = useState('');
  const [loginPw, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(`email is :  ${loginEmail}`);
    console.log(`pw is :  ${loginPw}`);
    if (loginEmail === "" || loginPw === "") {
      alert('error');
    } else {
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPw);
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(`${localStorage.getItem('token')}`);
        // setLoading(false);

        navigate('/home');
      } catch (error) {
        console.log(error);
        alert('user not exists')
      }

    }

  }


  return (
    <div className='login-container'>
      <img src={MainImage} alt="Image" />
      <div className="login-content">
        <h1>Sign in</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder='Email address'
            required
            onChange={(_email) => {
              setEmail(_email.target.value);
              console.log(`email is :${loginEmail}, ${_email}`);
            }}
          />
          <input
            type="password"
            placeholder='Password'
            required
            onChange={(pw) => {
              setPassword(pw.target.value);
              console.log(`email is :${pw}, ${loginPw}`);
            }}
          />
          <button type='submit'>
            {isLoading ? <Loading isLoading={isLoading} /> : "Sign in"}
          </button>
          <div className='login-divider'>
                    <div >

                    </div>
                    <span>or</span>
                    <div></div>
                </div>
          <div className="other-signin">
            <motion.button className='other-btn'
            whileHover={{opacity:1, scale:1.2}}
         
            >Google</motion.button>
            <motion.button className='other-btn'
            whileHover={{opacity:1, scale:1.2}} >Facebook</motion.button>
          </div>
          <motion.p 
          whileHover={{opacity:1, scale:1.5}}
          className='signup-txt'>Don't have an account? 
          <button className='link'
          onClick={() => navigate('/signup')}
          >Sign up</button>
          </motion.p>

          {/* {load ? <Loading isLoading={isLoading} /> : "Sign in"} */}
        </form>
      </div>

    </div>
  );
}

export default Login;