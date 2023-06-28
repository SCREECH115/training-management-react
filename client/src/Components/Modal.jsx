import { useReducer } from "react"

const Modal = ({visibility, setVisible, task}) => {

   const reducer = (state, action) => {
      switch (action.type) {
         case 'name':
            return {...state, name: action.payload}
         case 'date':
            return {...state, date: action.payload}
         case 'hour':
            return {...state, hour: action.payload}
         case 'duration':
            return {...state, duration: action.payload}
         case 'place':
            return {...state, place: action.payload}
         case 'cost':
            return {...state, cost: action.payload}
         case 'description':
            return {...state, description: action.payload}
         default:
            return state
      }
   }

   const [state, dispatch] = useReducer(reducer, {
      name: '',
      date: '',
      hour: '',
      duration: '',
      place: '',
      cost: '',
      description: ''
   })

   const handleChange = (e) => {
      dispatch({type: e.target.name, payload: e.target.value})
   }

   const input = 'w-3/4 p-2 mb-2 border-2 border-gray-400 rounded-lg'

   return (
      <div className={visibility ? "flex justify-center absolute w-full z-50 " : "flex justify-center hidden"}>
         <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-gray-200 rounded-lg m-5 shadow-[0px_5px_15px_5px_#00000024]">
            <h1 className="text-2xl font-bold p-5">Dodaj szkolenie</h1>

            <input className={input} type="text" placeholder="Nazwa "  />
            <input className={input} type="date" placeholder="Data"  />
            <input className={input} type="text" placeholder="Godzina " />
            <input className={input} type="text" placeholder="Czas trwania "  />
            <input className={input} type="text" placeholder="Miejsce "  />
            <input className={input} type="text" placeholder="Koszt " />

            <textarea className="w-3/4 p-2 mb-2 border-2 border-gray-400 rounded-lg h-32 min-h-full" type="text" placeholder="Opis "  />


            <div className="flex items-center justify-center w-3/4 p-2 mb-2  rounded-lg gap-10">

            <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300" onClick={() => {setVisible(false)}}>Anuluj</button>

            <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all ease-in-out duration-300">Zapisz</button>

            </div>
         </div>
      </div>
   );
}

export default Modal;