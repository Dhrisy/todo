import React from 'react';
import { motion } from 'framer-motion';
import Today from './today/today';

function RightComponent({selected, selectedTask}) {
  console.log(selected);
  console.log(selectedTask);

 
  
    switch (true) {
        case selectedTask === 1 && selected === 0:
          return <motion.div
          animate={{ x: 0, y:0 }}
          transition={{ ease: "easeOut", duration: 33,delay:4, }}
          style={{background: "red", height:700, width:1500}}
          >Content for personalButton 1</motion.div>;
        case selectedTask === 1 && selected === 1:
          return <div>Content for workButton 2</div>;
        case selectedTask === 0 && selected === 0:
          return <div>Content for upcomingButton 3</div>;
        case selectedTask === 0 && selected === 1:
          return <motion.div><Today/></motion.div>;
        case selectedTask === 0 && selected === 2:
          return <div>Content for calenderButton 3</div>;
        case selectedTask === 2 && selected === 0:
          return <div>Content for settingButton 3</div>;
        default:
          return null;
      }
}

export default RightComponent;