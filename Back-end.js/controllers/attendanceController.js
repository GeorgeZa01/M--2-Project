import { getAllEmployees } from "../models/attendanceModel.js";
import { getAttendanceData, addAttendance } from "../models/attendanceModel.js";
import { addLeaveRequest } from "../models/attendanceModel.js";

export const fetchEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const fetchAttendance = async (req, res) => {
  try {
    const attendanceData = await getAttendanceData();
    const transformedData = [];

    attendanceData.forEach((entry) => {
      let employee = transformedData.find((emp) => emp.employeeId === entry.employee_id);

      if (!employee) {
        employee = {
          employeeId: entry.employee_id,
          name: entry.name,
          attendance: [{ date: entry.attendance_date, status: entry.status }],
        };
        transformedData.push(employee);
      } else {
        employee.attendance.push({ date: entry.attendance_date, status: entry.status });
      }
    });

    res.json({ attendanceAndLeave: transformedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAttendance = async (req, res) => {
  const { employee_id, attendanceDate, status } = req.body;

  if (!employee_id || !attendanceDate || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await addAttendance(employee_id, attendanceDate, status);
    res.status(201).json({ message: "Attendance record added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const requestTimeOff = async (req, res) => {
    try {
      const { employee_id, beginning_date, ending_date, reason, status } = req.body;
      const rows = await addLeaveRequest(employee_id, beginning_date, ending_date, reason, status);
      res.status(201).json({ message: "Time off request submitted successfully", rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while submitting the request" });
    }
  };

