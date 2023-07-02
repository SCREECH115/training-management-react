import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

const Login = () => {   


   const [loginData, setLoginData] = useState({
      login: '',
      password: ''
   })

   const handleInputChange = (e) => {
      setLoginData({
         ...loginData,
         [e.target.name]: e.target.value
      })
   }

   const handleLogin = async (e) => {
      console.log(loginData);  
      
      try {
         const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            }
         });
         const data = await response.json();
         console.log(data);

         if (data.find(user => user.login === loginData.login && user.password === loginData.password)) {
            console.log('Zalogowano!');
         } else {
            console.log('Błędne dane!');
         }

         } catch (error) {
            console.error(error);
      }  
   }

   const styleInput = 'w-3/4 p-2 mb-2 border-2 border-gray-400 rounded-lg'

      return (
         <>
         <div className="flex justify-center mt-6 text-2xl bg-gray-800">
            <h1 className="flex font-bold uppercase text-white p-6 m-1 text-4xl select-none">
               Training Tasks
            </h1>
         </div>

         <div className='flex justify-center mt-4'>
         <Box
               component="form"
               sx={{
               '& .MuiTextField-root': { m: 1, width: '50ch'},
               }}
               noValidate
               autoComplete="off"
            >
               <div className='flex justify-center flex-col'>
                  <TextField
                  id="outlined-basic"
                  label="Login"
                  type='text'
                  className={styleInput}
                  variant='outlined'
                  name='login'
                  value={loginData.login}
                  onChange={handleInputChange}
                  />

                  <TextField
                  id="outlined-basic"
                  label="Hasło"
                  type='password'
                  className={styleInput}
                  variant='outlined'
                  name='password'
                  value={loginData.password}
                  onChange={handleInputChange}
                  />
               </div>
               <div className='flex justify-center gap-5'>
                  <Button variant='contained' onClick={handleLogin}>Zaloguj się</Button>
                  <Button variant='outlined'>Zarejestruj się</Button>
               </div>
            </Box>
         </div>

         <div className='flex justify-center mt-5'>
            Login: admin
            <br/>
            Hasło: admin
         </div>

         </>
      );
   }

export default Login;