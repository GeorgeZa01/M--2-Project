import { pool } from "../config/config.js"; // Make sure to import your db connection here

// Function to create a time off request
const createRequest = async (data) => {
    const { todaysDate, employeeName, startDate, endDate, reasons } = data;
    const query = `
        INSERT INTO timeoff_request (todays_date, name, start_date, end_date, reasons)
        VALUES (?, ?, ?, ?, ?)`;
    const values = [todaysDate, employeeName, startDate, endDate, reasons];

    try {
        const [result] = await pool.execute(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};



// Function to get all time off requests
const getRequests = async () => {
    const query = "SELECT * FROM timeoff_request";
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Exporting the functions directly
export { createRequest, getRequests };
