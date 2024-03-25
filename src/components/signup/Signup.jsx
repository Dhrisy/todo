import React, { useState } from 'react';
import "./Signup.scss"
import MainImage from "../../assets/mainimage.png"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';




function Signup() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [confirm_pw, setConfirm_pw] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [pwLength, setPwLength] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (email === "" || pw === "" || confirm_pw === "") {
            alert('pleae fill');
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
                console.log(userCredential);
                const user = userCredential.user;
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                console.log(`${localStorage.getItem('token')}`);

                await addDoc(collection(db, "users"),
                    {
                        "email": email
                    });

                    navigate('/home');
            } catch (error) {
                console.log(error);
            }

        }
    };

    const handlePwChange = (password) => {
        const getPassword = password.target.value;
        console.log(`length is ${getPassword.length}`);
        setPw(getPassword);

    }

    const handleConfirmPasswordChange = (_confirm_pw) => {
        const getConfirmPw = _confirm_pw.target.value;
        console.log(`confirm pw is ${getConfirmPw}`);
        setConfirm_pw(getConfirmPw);
        // Check if passwords match
        if (pw !== getConfirmPw) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    };
    return (
        <div id='signup' className='signup-container'>
            <img src={MainImage} alt="Image" />
            <div className="signup-content">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder='Email address'
                        required
                        onChange={(_email) => {
                            setEmail(_email.target.value);
                            console.log(`email is :${email}, ${_email}`);
                        }}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        onChange={handlePwChange}
                    />
                    <input
                        className={passwordMismatch ? "error" : ""}
                        type="password"
                        placeholder='Confirm password'
                        required
                        onChange={handleConfirmPasswordChange}
                    />

                    {passwordMismatch && <h6>Confirm password is not match</h6>}

                    <button type='submit'>Sign up</button>
                </form>

                <div className='signup-divider'>
                    <div >

                    </div>
                    <span>or</span>
                    <div></div>
                </div>
                <motion.p 
          whileHover={{opacity:1, scale:1.5}}
          className='signin-txt'>Already have an account? 
          <button className='link'
          onClick={() => navigate('/login')}
          >Sign in</button>
          </motion.p>

            </div>

        </div>
    );
}



export default Signup;