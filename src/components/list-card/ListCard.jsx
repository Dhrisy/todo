import React, { useEffect, useState } from 'react';
import "./ListCard.scss"
import { motion } from 'framer-motion';
import { Checkbox } from '@mui/material';
import { SlCalender } from "react-icons/sl";

function ListCard({ title, data, addTask, date, listName, clr }) {
  // console.log(`data: ${data.tasks}`);
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setUserTasks(data);
    } else {
      console.log(`error--------------->`);
    }

  }, []);

  return (
    <motion.div 
    whileHover={{opacity:1, scale: 1.05}}
    className='card-container'>
     <div className='above-content'>
     <div>
        <Checkbox
          style={{ color: "grey", borderWidth: "0px" }} />
        <span> {title}</span>
      </div>
      <svg
        onClick={addTask}
        viewBox="0 0 512 512"
        fill="currentColor"
        height="1em"
        width="1em">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={48}
          d="M184 112l144 144-144 144"
        />
      </svg>
     </div>

      <div className="below-card-items">
        <div className="card-date">
          <SlCalender className='calend' />
          <span>{date}</span>
        </div>

        <div className="work-personal">

          <div style={{
            height: 20,
            width: 20,
            borderRadius: 5,
            background: clr
          }}>
          </div>
          <span>
           {listName}
          </span>

         

        </div>
      </div>
    </motion.div>
  );
}

export default ListCard;