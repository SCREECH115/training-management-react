const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = 3000;
const mysql = require('mysql');



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

// LOGIN
app.get('/users', (req, res) => {
   connection.query('SELECT * FROM users', (err, rows, fields) => {
      if(err) throw err;
      res.json(rows)
   })
})

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

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
})

