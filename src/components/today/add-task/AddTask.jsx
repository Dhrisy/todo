import React, { useState } from 'react';
import "./AddTask.scss"
import DropDown from './Dropdown';
// import DatePicker from "react-datepicker"
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { SaveTask } from '../../../firebase/saveTask';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

class Task {
    constructor(title, dropdownValue, dueDate, startDate, isCompleted, description) {
        this.title = title;
        this.dropdownValue = dropdownValue;
        this.dueDate = dueDate;
        this.startDate = startDate;
        this.isCompleted = isCompleted;
        this.description = description;
    }
}

function AddTask({ addTask, selectedTask, taskIndex, _newTask }) {
    // console.log(`uuuu   ${newTask}`);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(_newTask ? '' : selectedTask.tasks[taskIndex].list_name);
    const [_date, setDtae] = useState(false);
    const [date, setDate] = useState(new Date());

    // const [title, setTitle] = useState('');
    const [description, setDescription] = useState(_newTask ? '' : selectedTask.tasks[taskIndex].description);
    const [listName, setListName] = useState('');

    const [startDate, setStartDate] = useState(null);
    const [isCompleted, setCompleted] = useState(false);
    const [listItems, setList] = useState([]);



    const [title, setTitle] = useState(_newTask ? '' : selectedTask.tasks[taskIndex].title);


    const handleMouseEnter = () => {
        setDropdownVisible((prevVal) => !prevVal);
    };

    const addList = (item) => {
        setList(prevList => [...prevList, item]);
    };


    const dateFormat = (date) => {

        const originalDate = new Date(date);

        const dd = String(originalDate.getDate()).padStart(2, '0');
        const mm = String(originalDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = originalDate.getFullYear();

        const formattedDate = `${dd}-${mm}-${yyyy}`;
        setStartDate(formattedDate);
        return formattedDate;


    }

    const handlUpdate = async (docRef, tasks) => {
        await updateDoc(docRef, { tasks: tasks })
            .then(() => {
                addTask(false);
                console.log("Task updated successfully");
           
            alert('Task updated successfully');
        
        })
            .catch(error => {console.error("Error updating task:", error);
            addTask(false);
            alert("Something went wrong, could'nt delete the task");
        });

            


    }

    const hanldeSave = async () => {
        const due_date = localStorage.getItem('date');
        const getdtae = dateFormat(due_date);
        console.log(getdtae);
        const newTask = new Task(title, dropdownValue, getdtae, startDate, isCompleted, description);
        setList((prevList) => [...prevList, newTask]);
        if (_newTask) {
            console.log(`wwwwwwwwwwwwwwww${newTask}`);
            await SaveTask(newTask, getdtae);
            addTask(false);
            alert('New task added successfully')
        } else {
            console.log(`yyyyyyyyyyyyy`);
            // UpdateTasks(newTask, taskIndex);
            console.log(`yyyyyyyyyyyyy`);
            const docRef = doc(db, "users", "luAvyCYaTHOvSDCVuANe");
            const docSnap = await getDoc(docRef);
            const tasks = docSnap.data().tasks; // Retrieve the tasks array
            const existingTask = tasks[taskIndex]; // Retrieve the existing task at taskIndex

            console.log(existingTask);
            const dueDate = dateFormat(localStorage.getItem('date'));
            if (existingTask.title !== title ||
                existingTask.description != description ||
                existingTask.list_name != dropdownValue ||
                existingTask.due_date != dueDate) {
                // Update the title of the existing task
                existingTask.title = title;
                existingTask.description = description;
                existingTask.list_name = dropdownValue;
                existingTask.due_date = dueDate;

                // Update the tasks array with the modified task
                tasks[taskIndex] = {
                    ...existingTask,
                    title: title,
                    description: description,
                    list_name: dropdownValue,
                    due_date: dueDate
                };

                handlUpdate(docRef, tasks);

            }
        }

    }

    const handleDelete = async () => {
        const docRef = doc(db, "users", "luAvyCYaTHOvSDCVuANe");
        const docSnap = await getDoc(docRef);
        const tasks = docSnap.data().tasks || []; // Retrieve the tasks array, ensure it exists

       if(!_newTask){
         // Define the index of the task you want to delete
         const taskIndexToDelete = taskIndex; // Example index to delete, replace with your logic

         if (taskIndexToDelete >= 0 && taskIndexToDelete < tasks.length) {
             // If the index is valid, delete the task at that index
             tasks.splice(taskIndexToDelete, 1); // Delete 1 element starting from the taskIndexToDelete
 
             // Update the user document with the modified tasks array
             await updateDoc(docRef, { tasks: tasks })
                 .then(() => console.log("Task deleted successfully"))
                 .catch(error => console.error("Error deleting task:", error));

                 addTask(false);

         } else {
             console.error("Invalid task index to delete");
         }
       }

    }

    return (
        <div className='add-task-container'>
            <div> <h2>Task:
                <svg
                    onClick={() =>
                        addTask(false)
                    }
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="1em"
                    width="1em">
                    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
                </svg></h2>
                <input value={title}
                    type="text"
                    className="task-name"
                    placeholder='Enter task name'
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                <textarea
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}

                    type="text"
                    placeholder="Description"
                    rows={5}
                ></textarea>
                <div className="options">
                    <div className="list">
                        <span>List</span>
                        <button
                            value={"listName"}
                            // onMouseEnter={handleMouseEnter}
                            // onMouseLeave={handleMouseLeave}
                            onClick={handleMouseEnter}>

                            {dropdownValue ? dropdownValue : "Select"}
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                onClick={handleMouseEnter}

                            >
                                <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
                            </svg>
                        </button>

                    </div>
                    {/* <DropDown listVlaue={setDropdownVisible}/> */}
                    {isDropdownVisible && <DropDown setValue={setDropdownValue} setHidden={setDropdownVisible} />}
                    {/* {dropdownValue} */}
                    <div className="date" >
                        <span>Due date</span>

                        <div className="date-picker"

                        >
                            {_date ? <ReactDatePicker selected={date} onChange={(date) => {
                                setDate(date);
                                localStorage.setItem("date", date);
                            }} className='selected-date' />
                                : _newTask ? "Select date" : selectedTask.tasks[taskIndex].due_date}

                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                onClick={() => {
                                    setDtae((prevVal) => !prevVal);
                                }}

                            >
                                <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
                            </svg>

                        </div>
                        {localStorage.getItem('user')}

                    </div>

                </div>
            </div>


            <div className="btn">
                <button
                    onClick={() => {
                        handleDelete();
                        alert('Deleted successfully')
                    }}
                    className='dlt'>Delete task</button>
                <button className='save'
                    onClick={() => {
                        // addList("jvjvj,bjhh");
                        hanldeSave();
                       
                        console.log(`list are: ${listItems}`);
                    }}>Save changes</button>
            </div>
        </div>
    );
}

export default AddTask;