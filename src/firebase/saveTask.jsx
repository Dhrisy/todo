import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { easeIn } from "framer-motion";

const docRef = doc(db, "users", "luAvyCYaTHOvSDCVuANe");
const docSnap = await getDoc(docRef);
export async function SaveTask(Task, date) {
    // const taskData = {
    //     title: task.title,
    //     dropdownValue: task.dropdownValue,
    //     startDate: task.startDate,
    //     listName: task.listName,
    //     description: task.description,

    // };

    try {


        if (docSnap.exists()) {
            const docData = docSnap.data();
            const existingTasks = docData.tasks || []; // if task arrya not exists then initlize an empty array
            const data = {
                title: Task.title,
                description: Task.description,
                due_date: Task.dueDate,
                list_name: Task.dropdownValue
            }

            // existingTasks.push(data); // Add the new task data to the existing tasks array

            // await updateDoc(docRef, { tasks: existingTasks })
            //     .then(() => {
            //         console.log("Task added successfully");
            //     })
            //     .catch(error => {
            //         console.error("Error adding task:", error);
            //     });

                const updatedTasks = [...existingTasks, data];

                // Update the tasks field in Firestore with the updated tasks array
                await updateDoc(docRef, { tasks: updatedTasks })
                    .then(() => {
                        console.log("Task added successfully");
                        alert('New task added successfully')
                    })
                    .catch(error => {
                        console.error("Error adding task:", error);
                       
            alert("Something went wrong, could'nt add the task");
                    });

        } else {

        }


    } catch (error) {
        console.log(error);
    }

}


