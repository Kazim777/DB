const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HR API!' });
});
app.get('/country', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM countries');
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


app.get('/regions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM regions');
    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


app.get('/abc', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM employees');
    res.json({
      success: true,
      count: result.rows[0].count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/assignment/:number', async (req, res) => {
  const { number } = req.params;
  
  const validNumbers = ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
  if (!validNumbers.includes(number)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid assignment number. Must be between 40 and 49.'
    });
  }

  let query = '';
  
  switch (number) {
    case '40':
      query = `
        SELECT e.*, l.city, l.state_province, c.country_name
        FROM employees e
        JOIN departments d ON e.department_id = d.department_id
        JOIN locations l ON d.location_id = l.location_id
        JOIN countries c ON l.country_id = c.country_id
      `;
      break;
    case '41':
      query = `
        SELECT jh.*, e.first_name, e.last_name
        FROM job_history jh
        JOIN employees e ON jh.employee_id = e.employee_id
      `;
      break;
    case '42':
      query = `
        SELECT e.*, jh.*
        FROM employees e
        LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
      `;
      break;
    case '43':
      query = `
        SELECT e.*, jh.*, d.department_name
        FROM employees e
        LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
        LEFT JOIN departments d ON jh.department_id = d.department_id
      `;
      break;
    case '44':
      query = `
        SELECT e.*, jh.*, d.department_name, l.city, l.state_province
        FROM employees e
        LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
        LEFT JOIN departments d ON jh.department_id = d.department_id
        LEFT JOIN locations l ON d.location_id = l.location_id
      `;
      break;
    case '45':
      query = `
        SELECT e.*, jh.*, c.country_name
        FROM employees e
        LEFT JOIN job_history jh ON e.employee_id = jh.employee_id
        LEFT JOIN departments d ON jh.department_id = d.department_id
        LEFT JOIN locations l ON d.location_id = l.location_id
        LEFT JOIN countries c ON l.country_id = c.country_id
      `;
      break;
    case '46':
      query = `
        SELECT jh.*, e.first_name, e.last_name, d.department_name
        FROM job_history jh
        JOIN employees e ON jh.employee_id = e.employee_id
        JOIN departments d ON jh.department_id = d.department_id
      `;
      break;
    case '47':
      query = `
        SELECT jh.*, e.first_name, e.last_name, j.job_title
        FROM job_history jh
        JOIN employees e ON jh.employee_id = e.employee_id
        JOIN jobs j ON jh.job_id = j.job_id
      `;
      break;
    case '48':
      query = `
        SELECT jh.*, e.first_name, e.last_name, j.job_title, d.department_name
        FROM job_history jh
        JOIN employees e ON jh.employee_id = e.employee_id
        JOIN jobs j ON jh.job_id = j.job_id
        JOIN departments d ON jh.department_id = d.department_id
      `;
      break;
    case '49':
      query = `
        SELECT jh.*, e.first_name, e.last_name, j.job_title, l.city
        FROM job_history jh
        JOIN employees e ON jh.employee_id = e.employee_id
        JOIN jobs j ON jh.job_id = j.job_id
        JOIN departments d ON jh.department_id = d.department_id
        JOIN locations l ON d.location_id = l.location_id
      `;
      break;
  }

  try {
    const result = await pool.query(query);
    res.json({
      success: true,
      assignment: number,
      data: result.rows,
      count: result.rowCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: err.message
    });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});