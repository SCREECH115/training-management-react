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

// GET TASKS
app.get('/tasks', (req, res) => {
   connection.query('SELECT * FROM tasks', (err, rows, fields) => {
      if (err) throw err;
      res.json(rows)
   })
});

// DELETE TASK
app.delete('/deleteTask', (req, res) => {
   const {id} = req.body;
   connection.query('DELETE FROM tasks where id = 1', (err, results, fields) => {
      if (err) throw err;
      res.sendStatus(200);
   })
})

// ADD TASK
app.post("/addTask", (req, res) => {

   const {date, time, duration, place, price, description} = req.body;

   if (!(date && time && duration && place && price && description)){
      res.sendStatus(400);
      return;
   }

   connection.query('INSERT INTO tasks (date, time, duration, place, price, description) VALUES(?, ?, ?, ?, ?, ?)', [date, time, duration, place, price, description],(err, results, fields) => {
      if (err) {
         res.sendStatus(500);
         throw err
      };

      console.log(results);
      res.sendStatus(201);
   })
})

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
})

