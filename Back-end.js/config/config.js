import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

const pool = mysql.createPool({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "Macaws01",
    database: process.env.DATABASE || "modern_tech_solutions",
});

export { pool };
