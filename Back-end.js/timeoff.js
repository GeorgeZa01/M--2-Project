import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "Macaws01",
    database: process.env.DATABASE || "modern_tech_solutions",
});

// POST route to handle the time off request submission
app.post("/api/timeoff", async (req, res) => {
    try {
        const { employee_id, employee_name, beginning_date, ending_date, reason, status } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO time_off_requests (employee_id, employee_name, beginning_date, ending_date, reason, status) VALUES (?, ?, ?, ?, ?, ?)",
            [employee_id, employee_name, beginning_date, ending_date, reason, status]
        );
        res.status(201).json({ message: "Time off request submitted successfully", rows });
    } catch (error) {
        console.error(error);
        res.status(500).json(
            { error: "An error occurred while submitting the time off request" }
        )
    
    }
});

