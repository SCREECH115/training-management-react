import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
   switch (action.type) {
      case 'title':
         return {...state, title: action.payload}
      case 'date':
         return {...state, date: action.payload}
      case 'time':
         return {...state, time: action.payload}
      case 'duration':
         return {...state, duration: action.payload}
      case 'place':
         return {...state, place: action.payload}
      case 'price':
         return {...state, price: action.payload}
      case 'description':
         return {...state, description: action.payload}
      case 'all':
         return {...state, ...action.payload}
         default:
         return state
   }
}

const sendData = async (data) => {
   try {
      const response = await fetch('http://localhost:3000/addTask', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }});
      if (!response.ok) {
         throw new Error('Błędne dane!');
      }
      const dataResponse = await response.json();
      return dataResponse
      } catch (error) {
         console.error(error);
      }
}

const editData = async (data) => {
   try {
      const response = await fetch('http://localhost:3000/editTask', {
         method: 'PATCH',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }});
      if (!response.ok) {
         throw new Error('Błędne dane!');
      }
      return true;
      } catch (error) {
         console.error(error);
      }
      return false;
}

const Modal = ({visibility, setVisible, setTasks, setEditTask, editTask}) => {

   const [inputs, dispatch] = useReducer(
      reducer, {
         title: '',
         date: '',
         time: '',
         duration: '',
         place: '',
         price: '',
         description: ''
      }
   )
   
   useEffect(() => {
      if (editTask) {
         dispatch({type: 'all', payload: editTask})
      }
   }, [editTask])

   const styleInput = 'w-3/4 p-2 mb-2 border-2 border-gray-400 rounded-lg'

   return (
      
      <div className={visibility ? "flex justify-center absolute w-full z-50 " : "justify-center hidden "}>
         <div className="flex flex-col items-center justify-center w-1/2 h-1/2  bg-gray-200 rounded-lg m-5 shadow-[5px_5px_100px_50px_#00000024] scale-95 transform transition-all duration-300 ">
            <h1 className="text-4xl font-bold p-5 select-none">
               {editTask ? 'Edytuj szkolenie' : 'Dodaj szkolenie'}
            </h1>

            <Box
               component="form"
               sx={{
               '& .MuiTextField-root': { m: 1, width: 'auto' },
               }}
               noValidate
               autoComplete="off"
            >
               <div className='flex justify-center flex-col'>
                  <TextField
                  id="outlined-basic"
                  label="Nazwa"
                  type='text'
                  className={styleInput}
                  variant='outlined'
                  value={inputs.title}
                  onChange={(e) => dispatch({type: 'title', payload: e.target.value})}
                  />

                  <TextField
                  id="outlined-basic"
                  type='date'
                  className={styleInput}
                  variant='outlined'
                  value={inputs.date}
                  onChange={(e) => dispatch({type: 'date', payload: e.target.value})}
                  />

                  <TextField
                  id="outlined-basic"
                  label="Godzina"
                  type='text'
                  className={styleInput}
                  variant='outlined'
                  value={inputs.time}
                  onChange={(e) => dispatch({type: 'time', payload: e.target.value})}
                  />

                  <TextField
                  id="outlined-basic"
                  label="Czas trwania"
                  type='text'
                  className={styleInput}
                  variant='outlined'
                  value={inputs.duration}
                  onChange={(e) => dispatch({type: 'duration', payload: e.target.value})}
                  />

                  <TextField
                  id="outlined-basic"
                  label="Miejsce"
                  type='text'
                  className={styleInput}
                  variant='outlined'
                  value={inputs.place}
                  onChange={(e) => dispatch({type: 'place', payload: e.target.value})}
                  />

                  <TextField
                  id="outlined-basic"
                  label="Koszt"
                  type='number'
                  className={styleInput}
                  variant='outlined'
                  // InputLabelProps={{
                  //    shrink: true,
                  //  }}
                  value={inputs.price}
                  onChange={(e) => dispatch({type: 'price', payload: e.target.value})}
                  />

                  <TextField
                  id="outlined-basic"
                  label="Opis"
                  type='text'
                  className={styleInput}
                  variant='outlined'
                  multiline
                  maxRows={8}
                  value={inputs.description}
                  onChange={(e) => dispatch({type: 'description', payload: e.target.value})}
                  />
               </div>
            </Box>

            <div className="flex items-center justify-center w-3/4 p-2 mb-2  rounded-lg gap-10">

            <Button variant='outlined' color="error" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300" onClick={() => {
               setVisible(false)
               setEditTask(null)
               dispatch({type: 'all', payload: {
                  title: '',
                  date: '',
                  time: '',
                  duration: '',
                  place: '',
                  price: '',
                  description: ''
               }})
            }}>Anuluj</Button>

            <Button variant='contained' color="success"  className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all ease-in-out duration-300" onClick={async() => {
               if (editTask) {
                  if (await editData(inputs)){
                     setTasks((prev) => {
                        const index = prev.findIndex((item) => item.id === editTask.id)
                        const newArray = [...prev]
                        newArray[index] = {...inputs}
                        return newArray
                     })
                  }
               } else {
                  try {
                     const sendInfo = await sendData(inputs)
                     console.log(sendInfo);
                     if (sendInfo) {
                        setTasks((prev) => {
                           return [...prev, {...inputs, id: sendInfo.id}]
                        })
                     }
                  } catch (error) {
                     console.error(error);
                  }
               }
               setVisible(false)
               setEditTask(null)
               dispatch({type: 'all', payload: {
                  title: '',
                  date: '',
                  time: '',
                  duration: '',
                  place: '',
                  price: '',
                  description: ''
               }})

            }}>Zapisz</Button>

            </div>
         </div>
      </div>
   );
}

export default Modal;