import React, { useEffect, useState } from 'react';
import "./today.scss"
import { IoMdAdd } from "react-icons/io";
import ListCard from '../list-card/ListCard';
import AddTask from './add-task/AddTask';
import { db } from '../../firebase/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


function Today() {
    const [addtask, setAddtask] = useState(false);
    const [newTask, setNewtask] = useState(false);
    const [info, setInfo] = useState([]);
    const [taskIndex, setTaskIndex] = useState(0);
    const [selectedTask, setSelectedTask] = useState(null);
    const [offlineError, setOfflineError] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSnackbar = () => {
        setOpen(true);
    };

    const handleAddTask = () => {
        setAddtask(true);
        setNewtask(true)
    }

    // window.addEventListener("load", () => {
    //     FetchData();
    // });


    const FetchData = async () => {
        const docRef = doc(db, "users", "luAvyCYaTHOvSDCVuANe");
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const docData = docSnap.data();
                setInfo(docData);
                const tasksArray = docData.tasks;
                // Add a listener to the document to listen for real-time updates
                const unsubscribe = onSnapshot(docRef, (doc) => {
                    if (doc.exists()) {
                        const newData = doc.data();
                        setInfo(newData);
                        // console.log(newData.tasks[0].title);
                    } else {
                        console.log("Document does not exist.");
                    }
                });

                // Return the unsubscribe function to clean up the listener when component unmounts
                return unsubscribe;
            } else {
                console.log("Document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            if (error.code === "unavailable") {
                setOfflineError(true);
                alert(`Something went wrong. Check your internet connection!`)
            }
        }
    };


    useEffect(() => {
        FetchData();
    }, []);

    const handleSelectedTask = (task, index) => {
        setAddtask(true);
        setNewtask(false);
        setSelectedTask(task);
        setTaskIndex(index);
    }


    return (
        <div className="main-container">
            <div className={`today-container${addtask ? "active" : ""}`}>
                <div className="topic">
                    <h1 className='heading'>Today</h1>
                    <div>
                        {info && info.tasks ? info.tasks.length : 0}
                    </div>
                </div>
                <button className='add-task'
                    onClick={handleAddTask}>
                    <svg

                        viewBox="0 0 512 512"
                        fill="currentColor"
                        height="1em"
                        width="1em">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={32}
                            d="M256 112v288M400 256H112" />
                    </svg>
                    <span>Add new task</span>
                </button>
                <div className="card-items">
                    {info && info.tasks && info.tasks.map((item, index) =>
                        <ListCard
                            title={item.title}
                            addTask={() => {
                                handleSelectedTask(item, index)
                            }}
                            clr={item.list_name === ""
                                ? ""
                                : item.list_name === "Personal"
                                    ? "red"
                                    : "rgb(0, 255, 247)"}

                            date={item.due_date}
                            listName={item.list_name}
                            taskIndex={index} />
                    )}

                </div>

                {info.title}
            </div>


            {addtask ? <AddTask
                _newTask={newTask}

                addTask={setAddtask}
                selectedTask={info}
                taskIndex={taskIndex}
                setTaskIndex={setTaskIndex} /> : ""}


        </div>
    );
}

export default Today;