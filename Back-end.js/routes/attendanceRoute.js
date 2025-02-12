import express from "express";
import { fetchEmployees } from "../controllers/attendanceController.js";
import { fetchAttendance, createAttendance, fetchTimeoff} from "../controllers/attendanceController.js";

const router = express.Router();


router.get("/employees", fetchEmployees); // Keep this for employees
router.get("/", fetchAttendance); // Keep this for attendance
router.post("/", createAttendance);
router.get("/employees", async (req, res) => {
    try {
        const [employees] = await pool.query("SELECT * FROM employees");

        const employeesWithLeaveRequests = await Promise.all(
            employees.map(async (employee) => {
                const [leaveRequests] = await pool.query(
                    "SELECT * FROM leave_requests WHERE employee_id = ?",
                    [employee.id]
                );
                return { ...employee, leaveRequests };
            })
        );

        res.json(employeesWithLeaveRequests);
    } catch (error) {
        res.status(500).json({ error: "Error fetching employees and leave requests" });
    }
});

export default router;
