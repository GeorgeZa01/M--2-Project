import express from "express";
import { fetchEmployees } from "../controllers/attendanceController.js";
import { fetchAttendance, createAttendance } from "../controllers/attendanceController.js";

const router = express.Router();


router.get("/employees", fetchEmployees); // Keep this for employees
router.get("/", fetchAttendance); // Keep this for attendance
router.post("/", createAttendance);


export default router;
