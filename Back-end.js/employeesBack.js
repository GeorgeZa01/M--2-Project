// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: '', // Change this to your MySQL password
    database: 'employees', // Database name
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// GET all employees
app.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {
        res.json(results);
    }
    });
});

// POST a new employee
app.post('/api/employees', (req, res) => {
    const { name, position, department, salary, employmentHistory, contact } = req.body;
    const query = 'INSERT INTO employees (name, position, department, salary, employmentHistory, contact) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [name, position, department, salary, employmentHistory, contact], (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(201).json({ id: results.insertId, name, position, department, salary, employmentHistory, contact });
    }
    });
});


//4. Frontend Integration (HTML + JS):
//Now that the backend is set up, we need to integrate the frontend with this API. You will be calling the GET and POST endpoints from your HTML/JS code.


document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees();
    document.getElementById('add-employee-form').addEventListener('submit', addEmployee);
});

// Function to fetch employees from the backend
async function fetchEmployees() {
    try {
    const response = await fetch('http://localhost:3000/api/employees');
    const employees = await response.json();
    const employeeCards = document.getElementById('employee-cards');

    // Clear any existing cards
    employeeCards.innerHTML = '';

    employees.forEach((employee) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <h3>${employee.name}</h3>
        <p>Position: ${employee.position}</p>
        <p>Department: ${employee.department}</p>
        <p>Salary: R${employee.salary}</p>
        <p>Email: ${employee.contact}</p>
        <button onclick="editEmployee(${employee.id})">Edit</button>
        <button onclick="deleteEmployee(${employee.id})">Delete</button>
        `;
        employeeCards.appendChild(card);
    });
    } catch (error) {
    console.error('Error fetching employees:', error);
    }
}

// Function to add a new employee
async function addEmployee(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const salary = document.getElementById('salary').value;
    const employmentHistory = document.getElementById('employmentHistory').value;
    const contact = document.getElementById('contact').value;

    const newEmployee = { name, position, department, salary, employmentHistory, contact };

    try {
    const response = await fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
    });
    
    const employee = await response.json();
    alert('Employee added successfully!');
    fetchEmployees(); // Refresh employee list after adding a new one
    } catch (error) {
    console.error('Error adding employee:', error);
    alert('Failed to add employee.');
    }
}


