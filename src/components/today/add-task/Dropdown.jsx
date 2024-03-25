import React from 'react';
import { motion } from 'framer-motion';

function DropDown({setHidden, setValue}) {
    const list = [
        
        "Personal",
        "Work"
    ]
  return (
    <div className="dropdown-menu">
      <ul>

        {list.map((item) => {
            return <motion.li value={"listName"}
            className={`${item === "Personal" ? "list-personal":"list-work"} `}
            whileHover={{opacity:1, scale: 1.1}}
            onClick={() => {
                setValue(item);
                setHidden(false);
            }}>{item}</motion.li>

        })}
        
        {/* <li
        onClick={() => {
            listVlaue(false)
        }}
        >Menu 2</li>
        <li
        onClick={() => {
            listVlaue(false)
        }}
        >Menu 3</li> */}
      </ul>
    </div>
  );
}

export default DropDown;