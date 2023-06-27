const Task = ({visibility}) => {
 return (
   <>
   
         <div className={visibility ? "flex justify-center blur-sm" : "flex justify-center"}>
            <div className="bg-slate-600 p-10 text-white rounded-lg ">
               <div className="flex justify-center ">
                  <div className="text-2xl text-center mb-5 ">Szkolenie BHP
                  <div className="px-3 py-2 mt-2 bg-white text-black rounded-lg text-sm font-semibold select-none shadow-[0px_5px_15px_5px_#00000024]">100,00 zł</div></div>
               </div>
                  

               <div className="bg-gray-700 p-5 rounded text-center border-2 border-solid shadow-[0px_5px_15px_5px_#00000024]">
                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Data</div> 
                     <div className="text-base mb-2">12.12.2021</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />
                  
                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Godzina</div> 
                     <div className="text-base mb-2">12:00</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />


                  
                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Czas trwania</div> 
                     <div className="text-base mb-2">2h 0m</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />



                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Miejsce</div> 
                     <div className="text-base mb-2">Warszawa</div>
                  </div>
                  
                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />



                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Koszt</div> 
                     <div className="text-base mb-2">100,00 zł</div>
                  </div>

                  <hr className="h-4 w-1/3 flex justify-start align-middle m-auto" />



                  <div className="text-sm">
                     <div className="bg-gray-500 w-max px-5 py-1 rounded font-medium m-auto mb-2 shadow-[0px_5px_15px_5px_#00000024]">Opis</div> 
                     <div className="text-base mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</div>
                  </div>
               </div>


               <div className="flex justify-center mt-5">
                  <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg shadow-[0px_5px_15px_5px_#00000024] hover:bg-green-600 transition-all ease-in-out duration-300">Zapisz się</button>
               </div>

            </div>
         </div>

   </>
 )  
}

export default Task;