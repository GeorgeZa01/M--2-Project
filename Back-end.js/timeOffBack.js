// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    assword: '', // Replace with your MySQL password
    database: 'StaffManagementDB', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// POST route to handle the time off request submission
app.post('/api/submit-time-off', (req, res) => {
    const { todaysDate, employeeName, startDate, endDate, reason, otherReason } = req.body;

  // Check if all required fields are provided
    if (!todaysDate || !employeeName || !startDate || !endDate || !reason) {
    return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `INSERT INTO time_off_requests (todaysDate, employeeName, startDate, endDate, reason, otherReason) 
                    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [todaysDate, employeeName, startDate, endDate, reason, otherReason], (err, result) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while submitting the request.' });
    }
    res.status(200).json({ message: 'Time off request submitted successfully' });
    });
});





//Step 3: Connect the Frontend to the Backend

//Now, modify the frontend JavaScript to send the form data to the backend. Update the handleSubmit function to send an HTTP POST request to the backend.

function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("timeOffForm");
    const formData = new FormData(form);

  // Get the selected reasons
    const reasons = formData.getAll("reason");
    if (reasons.length === 0) {
    Swal.fire("Error", "Please select at least one reason for time off.", "error");
    return;
    }

  // Get the other reason if "Others" is selected
    const otherReason = formData.get("otherReason");

  // Get the form data
    const requestData = {
    todaysDate: formData.get("todaysDate"),
    employeeName: formData.get("employeeName"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    reason: reasons.join(", "),  // Join the reasons into a string
    otherReason: otherReason || "", // If "Others", include the specified reason
    };

  // Send data to the backend via fetch API
    fetch("http://localhost:3000/api/submit-time-off", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
        Swal.fire("Error", data.error, "error");
        } else {
        Swal.fire("Success", data.message, "success");
        form.reset();
        }
    })
    .catch((error) => {
        Swal.fire("Error", "An error occurred while submitting your request.", "error");
    });
}
