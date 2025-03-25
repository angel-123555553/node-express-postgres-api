// the env variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

//need to establish app port
const app = express();
const port = 3000; // port

// Middleware for JSON/form parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// the route we are going to use to 
app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

// crud endpoints
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
