import { pool } from "../config/config.js";  // Make sure this path is correct

// Get all employees
const getEmployees = async () => {
    try {
        const [data] = await pool.query("SELECT employee_id, name, position, department, salary, employmentHistory, contact FROM employees");
        return data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Failed to fetch employees");
    }
};

// Delete an employee by employee_id
const deleteEmployees = async (employee_id) => {
    try {
        await pool.query("DELETE FROM employees WHERE employee_id = ?", [employee_id]);
        return await getEmployees(); // Return the updated list of employees
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw new Error("Failed to delete employee");
    }
};

// Insert a new employee
const insertEmployees = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
    try {
        await pool.query(
            "INSERT INTO employees (employee_id, name, position, department, salary, employmentHistory, contact) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [employee_id, name, position, department, salary, employmentHistory, contact]
        );
        return await getEmployees(); // Return the updated list of employees
    } catch (error) {
        console.error("Error inserting employee:", error);
        throw new Error("Failed to insert employee");
    }
};

// Update an existing employee
const updateEmployees = async (name, position, department, salary, employmentHistory, contact, employee_id) => {
    try {
        await pool.query(
            "UPDATE employees SET name = ?, position = ?, department = ?, salary = ?, employmentHistory = ?, contact = ? WHERE employee_id = ?",
            [name, position, department, salary, employmentHistory, contact, employee_id]
        );
        return await getEmployees(); // Return the updated list of employees
    } catch (error) {
        console.error("Error updating employee:", error);
        throw new Error("Failed to update employee");
    }
};

export { getEmployees, deleteEmployees, insertEmployees, updateEmployees };
