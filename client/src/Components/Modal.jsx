import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

const Modal = ({visibility, setVisible, task}) => {

   const input = 'w-3/4 p-2 mb-2 border-2 border-gray-400 rounded-lg'

   return (
      
      <div className={visibility ? "flex justify-center absolute w-full z-50 " : "flex justify-center hidden"}>
         <div className="flex flex-col items-center justify-center w-1/2 h-1/2  bg-gray-200 rounded-lg m-5 shadow-[5px_5px_100px_50px_#00000024]">
            <h1 className="text-2xl font-bold p-5 text-4xl">Dodaj szkolenie</h1>

            {/* <TextField id="outlined-basic" label="Nazwa" type='text' className={input} style={{ marginTop: '3px' }} variant="outlined" />
            <TextField id="outlined-basic" type='date' className={input} variant="outlined" />
            <TextField id="outlined-basic" mt='3px' label="Godzina" type='text' className={input} variant="outlined" />
            <TextField id="outlined-basic" label="Czas trwania" type='text' className={input} variant="outlined" />
            <TextField id="outlined-basic" label="Miejsce" type='text' className={input} variant="outlined" />
            <TextField id="outlined-basic" label="Koszt" type='text' className={input} variant="outlined" />
            <TextField id="outlined-basic" label="Opis" type='text' className={input} variant="outlined" /> */}

            <Box
               component="form"
               sx={{
               '& .MuiTextField-root': { m: 1, width: '100ch' },
               }}
               noValidate
               autoComplete="off"
            >
               <div className='flex justify-center flex-col'>
                  <TextField
                  id="outlined-basic"
                  label="Nazwa"
                  type='text'
                  className={input}
                  variant='outlined'
                  />

                  <TextField
                  id="outlined-basic"
                  type='date'
                  className={input}
                  variant='outlined'
                  />

                  <TextField
                  id="outlined-basic"
                  label="Godzina"
                  type='text'
                  className={input}
                  variant='outlined'
                  />

                  <TextField
                  id="outlined-basic"
                  label="Czas trwania"
                  type='text'
                  className={input}
                  variant='outlined'
                  />

                  <TextField
                  id="outlined-basic"
                  label="Miejsce"
                  type='text'
                  className={input}
                  variant='outlined'
                  />

                  <TextField
                  id="outlined-basic"
                  label="Koszt"
                  type='number'
                  className={input}
                  variant='outlined'
                  // InputLabelProps={{
                  //    shrink: true,
                  //  }}
                  />

                  <TextField
                  id="outlined-basic"
                  label="Opis"
                  type='text'
                  className={input}
                  variant='outlined'
                  multiline
                  maxRows={8}
                  />
               </div>
            </Box>


            {/* <textarea className="w-3/4 p-2 mb-2 border-2 border-gray-400 rounded-lg h-32 min-h-full" type="text" placeholder="Opis "  /> */}


            <div className="flex items-center justify-center w-3/4 p-2 mb-2  rounded-lg gap-10">

            <Button variant='outlined' color="error" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300" onClick={() => {setVisible(false)}}>Anuluj</Button>

            <Button variant='contained' color="success"  className="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all ease-in-out duration-300" >Zapisz</Button>

            </div>
         </div>
      </div>
   );
}

export default Modal;