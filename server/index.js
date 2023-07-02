const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = 3000;
const mysql = require('mysql');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Cors
app.use(cors())

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'password',
   database: 'training_management'
})

connection.connect();

// GET TASKS
app.get('/tasks', (req, res) => {
   connection.query('SELECT * FROM tasks', (err, rows, fields) => {
      if (err) throw err;
      res.json(rows)
   })
});

// EDIT TASK
app.patch('/editTask', (req, res) => {
   const {id, title, date, time, duration, place, price, description} = req.body;

   if (!(title && date && time && duration && place && price && description)){
      res.sendStatus(400);
      return;
   }

   connection.query('UPDATE tasks SET title = ?, date = ?, time = ?, duration = ?, place = ?, price = ?, description = ? WHERE id = ?', [title, date, time, duration, place, price, description, id], (err, results, fields) => {
      if (err) {
         res.sendStatus(500)
         throw err;
      }
      res.sendStatus(200);
   })
})

// DELETE TASK
app.delete('/deleteTask', (req, res) => {
   const {id} = req.body;
   connection.query('DELETE FROM tasks where id = ?', [id], (err, results, fields) => {
      if (err) {
         res.sendStatus(500);
         throw err;
      };
      res.sendStatus(200);
   })
})

// ADD TASK
app.post("/addTask", (req, res) => {

   const {title, date, time, duration, place, price, description} = req.body;

   if (!(title && date && time && duration && place && price && description)){
      res.sendStatus(400);
      return;
   }

   connection.query('INSERT INTO tasks (title, date, time, duration, place, price, description) VALUES(?, ?, ?, ?, ?, ?, ?)', [title, date, time, duration, place, price, description],(err, results, fields) => {
      if (err) {
         res.sendStatus(500);
         throw err
      };

      console.log(results);
      res.json({id:results.insertId});
   })
})

// SIGNUP
app.post('/signup', (req, res) => {
   const {login, password} = req.body;
   const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

   try {
      const signUp = connection.query(
         `INSERT INTO users (login, password) values (?, ?)`, [login, hashedPassword]
      );

      const token = jwt.sign({email}, "secret", {expiresIn: "1hr"});

      res.json({email, token})
   }
      catch(err){
         if (err) {
            res.json({ detail: err.detail });
          }
         throw new err;
      }
})

// LOGIN
app.post('/login',  (req, res) => {
   const {login, password} = req.body;

   try{
      const users = connection.query("SELECT * FROM users WHERE login = ?", [
         login,
       ]);
      
      if (!users.rows) return res.json({ detail: "User does not exist" });

      const succes = bcrypt.compare(
         password,
         users.rows[0].password
      );
      const token = jwt.sign({login}, "secret", {expiresIn: "1hr"});

      if (succes){
         res.json({email: users.row[0].email, token});
      } else {
         res.json({detail: "Login failed"})
      }
   } catch (err) {
      console.error(err);
   }
})

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
})

