import Modal from "./Modal"
import Task from "./Task"
import { useState } from "react"

export default function App() {

  const [visible, setVisible] = useState(false)

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

    

    <div className="grid grid-cols-3 gap-5 m-10 ">
      <Task visibility={visible} />
      <Task visibility={visible}/>
      <Task visibility={visible}/>
      <Task visibility={visible}/>
      <Task visibility={visible}/>
      <Task visibility={visible}/>
      <Task visibility={visible}/>
      <Task visibility={visible}/>
      <Task visibility={visible}/>
    </div>
      
     
    <Modal visibility={visible} setVisible={setVisible} />
    </>
  )
}