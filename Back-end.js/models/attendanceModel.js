import { pool } from "../config/config.js";

export const getAllEmployees = async () => {
  const [employees] = await pool.query("SELECT employee_id, name FROM Employees");
  return employees;
};

export const getAttendanceData = async () => {
    const [attendanceData] = await pool.query(`
      SELECT e.name, a.attendance_date, a.status, e.employee_id
      FROM Attendance a
      JOIN Employees e ON a.employee_id = e.employee_id
      ORDER BY e.employee_id, a.attendance_date ASC
    `);
    return attendanceData;
  };
  
  export const addAttendance = async (name, attendanceDate, status) => {
    const result = await pool.query(
      "INSERT INTO Attendance (employee_id, attendance_date, status) VALUES (?, ?, ?)",
      [name, attendanceDate, status]
    );
    return result;
  };

  export const addLeaveRequest = async (employee_id, beginning_date, ending_date, reason, status) => {
    const [rows] = await pool.query(
      "INSERT INTO leave_request (employee_id, beginning_date, ending_date, reason, status) VALUES (?, ?, ?, ?, ?)",
      [employee_id, beginning_date, ending_date, reason, status]
    );
    return rows;
  };