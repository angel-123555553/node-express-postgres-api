// load all the enviroment variables
require('dotenv').config();
const { Pool } = require('pg');

// create the pool
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, //env files reciprocate
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// code to get all the users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => { //select query by the id
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// get a single user by their respective id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => { //select by respective id
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// posting a new user , creating a new user
const createUser = (req, res) => {
  const { name, email } = req.body;
  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// if you want to update the user
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// delete a user
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

// export of all the functions
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
