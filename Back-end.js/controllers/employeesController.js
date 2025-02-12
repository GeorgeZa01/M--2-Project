import { getEmployees, deleteEmployees, insertEmployees, updateEmployees } from "../models/employeesModel.js";

// Get all employees
const getEmployeesController = async (req, res) => {
    try {
        const employees = await getEmployees();
        res.json({ employees });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees" });
    }
};

// Add a new employee
const postEmployeesController = async (req, res) => {
    const {name, position, department, salary, employmentHistory, contact } = req.body;
    try {
        const employees = await insertEmployees(name, position, department, salary, employmentHistory, contact);
        res.json({ message: "Employee added successfully", employees });
    } catch (error) {
        res.status(500).json({ message: "Error adding employee" });
    }
};

// Delete an employee
const deleteEmployeesController = async (req, res) => {
    const { employee_id } = req.params;  // Get employee_id from params to delete
    try {
        const employees = await deleteEmployees(employee_id);
        res.json({ message: "Employee deleted successfully", employees });
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee" });
    }
};

// Update an existing employee
const editEmployeesController = async (req, res) => {
    const { name, position, department, salary, employmentHistory, contact } = req.body;
    const { employee_id } = req.params;  // Get employee_id from params for update

    try {
        const employees = await updateEmployees(name, position, department, salary, employmentHistory, contact, employee_id);
        res.json({ message: "Employee updated successfully", employees });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee" });
    }
};

export { getEmployeesController, postEmployeesController, deleteEmployeesController, editEmployeesController };
