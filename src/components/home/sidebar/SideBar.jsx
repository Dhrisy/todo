import React, { useEffect, useState } from 'react';
import "./SideBar.scss"
import ToggleButton from '../togglebutton/ToggleButton';
import { motion } from 'framer-motion';
import { SidebarItems, SidebarLists, others } from '../../../sidebar-items/SidebarItems';

function SideBar({onLogout, selectedTask}) {
  const [select, setSelect] = useState(null);
  const [selectList, setSelectList] = useState(0);
  const [selectOther, setSelectOther] = useState(null);
  const [entryPage, setEntryPage] = useState(true);

  useEffect(() => {
    if (entryPage) {
      setSelectList(1);
      setEntryPage(false); // Reset entryPage to false after setting selectList
      // seletctedList(null);
    }
  }, [entryPage]);




  const onSelect = (index) => {
    console.log('oooo');
    setSelect((prevBool) => prevBool === index ? null : index);
  }
  const onSelectList = (index) => {
    console.log('pppp');
    setSelectList(index);
  }
  const onSelectOther = (index) => {
    console.log('pppp');
    setSelectOther((prevBool) => prevBool === index ? null : index);
  }


  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  return (
    <motion.div className='sidebar-container'
    variants={container}
    initial="hidden"
    animate="visible">
      <div>
        <div className="menubar">
          <span>Menu</span>
          <ToggleButton />
        </div>
        <div className="search-bar">
          <svg className='search-icon'
            fill=""
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
          >
            <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
          </svg>
          {/* <i class="fa fa-bars"></i> */}
          <input type="text" placeholder='Search' className='search' />
        </div>

       

        <div className="tasks-container">
          <p>TASKS</p><div>
            {SidebarItems.map((item, index) => {
              return <motion.button
              variants={items}
              key={item}
                className={`${selectList=== index ? "active" : "inactive"}`}
                onClick={() => {
                  onSelectList(index);
                  setSelect(false);
                  setSelectOther(false);
                  selectedTask(0, index)
                }}
                whileHover={{ opacity1: 1, scale: 1.1 }} >
                <div className='card-btn'>
                  <div className="icon">
                    <div>
                      {item.icon}
                    </div>
                  </div>
                  <p>
                    {item.title}
                  </p>

                  <div className="num">
                    {item.num}
                  </div>
                </div>

              </motion.button>
            })}

          </div>
          <div className='divider'></div>
        </div>

        <div className="tasks-container">
          <p>LISTS</p><div>
            {SidebarLists.map((item, index) => {
              return <motion.button
              key={item}
              variants={items}
                class={`${selectOther === index ? "active" : "inactive"}`}
                onClick={() => {
                  onSelectOther(index);
                  setSelectList(false);
                  setSelect(false);
                  selectedTask(1, index);

                }}
                whileHover={{ opacity1: 1, scale: 1.1 }} >
                <div className='card-btn'>
                  <div style={{
                    height: 20,
                    width: 20,
                    borderRadius: 5,
                    background: item.clr
                  }}>
                  </div>
                  <p>
                    {item.title}
                  </p>

                  <div className="num">
                    {item.num}
                  </div>
                </div>

              </motion.button>
            })}

          </div>

        </div>



      </div>
      <div className='other-card-btn'>
        {others.map((item, index) => {
          return <motion.button
          key={item}
          variants={items}
            class={`${select === index ? "active" : "inactive"}`}
            onClick={() => {onSelect(index);
              setSelectList(false);
              setSelectOther(false);
              // selectedSetting();
              selectedTask(2, index);
            }}
            whileHover={{ opacity1: 1, scale: 1.1 }} >
            <div className='card-btn'>
              <div>
                {item.icon}
              </div>
              <p>{item.title}</p>
              <div></div>

            </div>

          </motion.button>
        })}

       

        <motion.button
          className='logout-card'
          onClick={() => {
            onLogout();
            setSelect(false);
            setSelectList(false);
            setSelectOther(false);
          }}
          // onClick= {() => onSelect(index)}
          whileHover={{ opacity1: 1, scale: 1.1 }} >
          <div className='logout'>
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em">
                <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
              </svg>
            </div>
            <p>Logout</p>
            <div></div>
          </div>

        </motion.button>
      </div>


      {/* {showConfirmation && (
        <div className="popup">
          <p>Are you sure you want to logout?</p>
          <button onClick={handleConfirmLogout}>Yes</button>
          <button onClick={handleCancelLogout}>No</button>
        </div>
      )} */}



    </motion.div>
  );
}

export default SideBar;