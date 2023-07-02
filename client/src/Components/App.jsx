import Modal from "./Modal"
import Task from "./Task"
import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import Login from "./Login";

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
}

export default function App() {

  const [visible, setVisible] = useState(false)
  const [tasks, setTasks] = useState([]) 
  const [editTask, setEditTask] = useState(null)

  useEffect( () => {
    const getTasks = async () => {
       try {
          const response = await fetch('http://localhost:3000/tasks', {
             method: 'GET',
             headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
             }
          });

       const data = await response.json();
       setTasks(data.map((task) => {
        return {...task , date: formatDate(new Date(task.date))}
        })
        );

       } catch (error) {
          console.error(error);
       }
    }
    getTasks();
 }, [])

  return (
  <>
    <Login /> 
    <div className={visible ? "blur-sm opacity-25 transition-opacity duration-500" : "transition-opacity duration-500"}>
      <div className="flex justify-center mt-6 text-2xl bg-gray-800">
        <h1 className="flex font-bold uppercase text-white p-6 m-1 text-4xl select-none">
          Training Tasks
        </h1>
      </div>

      <div className="flex justify-center mt-6 ">
      <Button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg shadow-[0px_5px_15px_5px_#00000024] hover:bg-green-700 transition-all ease-in-out duration-300 " onClick={() => {setVisible(true)}} variant="contained" size="large" color="primary">Dodaj szkolenie</Button>
      </div>
    </div>

    <Modal visibility={visible} setVisible={setVisible} setTasks={setTasks} setEditTask={setEditTask} editTask={editTask} />

    <div className="grid desktop:grid-cols-3 gap-5 m-10 laptop:grid-cols-2 tablet:grid-cols-1">
      {tasks.map((task) => {
        return <Task key={task.id} data={task} visibility={visible} setTasks={setTasks} setEditTask={setEditTask} setVisible={setVisible}/>        
      })}
    </div>
  </>  
  )
}