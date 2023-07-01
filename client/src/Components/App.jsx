import Modal from "./Modal"
import Task from "./Task"
import { useState, useEffect } from "react"

export default function App() {

  const [visible, setVisible] = useState(false)
  const [tasks, setTasks] = useState([])

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
       setTasks(data);

       } catch (error) {
          console.error(error);
       }
    }
    getTasks();
 }, [])

  return (
    <>
    <div className={visible ? "blur-sm" : ""}>
      <div className="flex justify-center mt-6 text-2xl bg-gray-800">
        <h1 className="flex font-bold uppercase text-white p-6 m-1 text-4xl">
          Training Tasks
        </h1>
      </div>

      <div className="flex justify-center mt-6 ">
      <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg shadow-[0px_5px_15px_5px_#00000024] hover:bg-green-700 transition-all ease-in-out duration-300 " onClick={() => {setVisible(true)}}>Dodaj szkolenie</button>
      </div>
    </div>

    <Modal visibility={visible} setVisible={setVisible} />

    <div className="grid grid-cols-3 gap-5 m-10 ">
      {tasks.map((task) => {
      return <Task key={task.id} data={task} visibility={visible}  />        
      })}
    </div>
    </>
  )
}