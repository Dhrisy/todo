import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import "./Home.scss"
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import SideBar from './sidebar/SideBar';
import { motion } from 'framer-motion';
import RightComponent from '../right';

function Home() {
  // const navigate = useNavigate();
  const [selectItem, setSelectedItem] = useState(0);
  const [selectItem1, setSelectedItem1] = useState(0);
  const [selectTask, setSelectedTask] = useState(0);


  const [entryHme, setEntryHome] = useState(true);

  useEffect(() => {
    if (entryHme) {
      setSelectedItem(1);
      setEntryHome(false); // Reset entryPage to false after setting selectList
    }
  }, [entryHme]);


  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = async () => {
    // Display the logout confirmation popup
    setShowConfirmation(true);
  }

  const handleConfirmLogout = async () => {
    // Perform logout action
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // navigate('/signup');
  }

  const handleCancelLogout = () => {
    // Hide the logout confirmation popup
    setShowConfirmation(false);
  }


  const variants = {
    open: {
      clipPath: "circle(2500px at 50px 50px)",
      transition: {
        // type: "spring",

      }
    },
    closed: {
      clipPath: "circle(30px at 50px 50px)",
      transition: {
        // delay: 0,
        // type: "spring",

      }
    }
  }


  const handleSelect = (taskIndex, index) => {
    setSelectedTask(taskIndex);
    setSelectedItem(index);
    console.log(`aaa  ${selectTask}, ${selectItem}`);

  }


  return (
    <div id='home' className='home-container'>

      <SideBar onLogout={handleLogout}  selectedTask={handleSelect}/>
      {/* <Right selected={selectItem}/> */}
      {/* <Right1 selected1={selectItem1}/> */}
      <RightComponent selected={selectItem} selectedTask={selectTask}/>
      
      {showConfirmation && (
        <motion.div className="popup"
        variants={variants}
        animate={showConfirmation ? "open" : "closed"}
        // animate={{ x: 100 }}
        // transition={{ ease: "easeOut", duration: 2 }}
        >
          <div className="popup-content">
            <p>Are you sure you want to logout?</p>
            <div className="buttons">
              <button className='confirm' onClick={handleConfirmLogout}>Yes</button>
              <button className='cancel' onClick={handleCancelLogout}>No</button>
            </div>
          </div>
        </motion.div>
      )}
      {/* <button onClick={() => handleLogout()}>Logout</button> */}
    </div>
  );
}

export default Home;