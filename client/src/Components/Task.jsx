import Button from '@mui/material/Button';

const deleteTask = async (id) => {
   try {
      const response = await fetch(`http://localhost:3000/deleteTask`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify({id})
      });
      if (!response.ok) {
         throw new Error('Błąd!');
      }
      return true;
      } catch (error) {
         console.error(error);
      }
      return false;
}

const Task = ({visibility, data, setTasks, setEditTask, setVisible}) => {

   const {description, date, time, duration, place, price, title} = data;

   return (
   <>
   
         <div className={visibility ? "flex justify-center blur-sm opacity-25 transition-opacity duration-500 " : "flex justify-center transition-opacity duration-500"}>
            <div className="bg-slate-600 p-10 text-white rounded-lg w-full ">
               <div className="flex justify-center ">
                  <div className="text-2xl text-center mb-5 ">{title}
                  <div className="px-3 py-2 mt-2 w-max m-auto bg-white text-black rounded-lg text-sm font-semibold select-none shadow-[0px_5px_15px_5px_#00000024]">{price} zł</div></div>
               </div>
                  

               <div className="bg-gray-700 p-5 rounded text-center border-2 border-solid shadow-[0px_5px_15px_5px_#00000024]">
                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Data</div> 
                     <div className="text-base mb-2">{date}</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />
                  
                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Godzina</div> 
                     <div className="text-base mb-2">{time}</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />


                  
                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Czas trwania</div> 
                     <div className="text-base mb-2">{duration}</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />



                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Miejsce</div> 
                     <div className="text-base mb-2">{place}</div>
                  </div>
                  
                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />



                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Koszt</div> 
                     <div className="text-base mb-2">{price}</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />



                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Opis</div> 
                     <div className="text-base mb-2">{description}</div>
                  </div>
               </div>


               <div className="flex justify-center gap-3 mt-5">
                  <Button className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg shadow-[0px_5px_15px_5px_#00000024] hover:bg-green-600 transition-all ease-in-out duration-300" variant='contained' color='success'>Dołącz</Button>

                  
                  <Button className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg shadow-[0px_5px_15px_5px_#00000024] hover:bg-green-600 transition-all ease-in-out duration-300" variant='contained' color='warning' onClick={() => {
                     setEditTask(data)
                     setVisible(true)
                  }}>Edytuj</Button>

                  <Button className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg shadow-[0px_5px_15px_5px_#00000024] hover:bg-green-600 transition-all ease-in-out duration-300" variant='contained' color='error' onClick={
                     async () => {
                        if (await deleteTask(data.id)) {
                           setTasks((prev) => {
                              return prev.filter((task) => task.id !== data.id);
                           })
                        }
                     }
                  }>Usuń</Button>

               </div>

            </div>
         </div>

   </>
 )  
}

export default Task;