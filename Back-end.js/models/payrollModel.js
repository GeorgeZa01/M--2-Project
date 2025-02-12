import { pool } from "../config/config.js";

export const getPayroll = async () => {
  const [rows] = await pool.query("SELECT * FROM payroll");
  return rows;
};

export const getSinglePayroll = async (employee_id) => {
  const [rows] = await pool.query('SELECT * FROM payroll where employee_id = ?', [employee_id])
  return rows
};


export const addPayroll = async (employee_id, hours_worked, leave_deductions, final_salary) => {
  const [result] = await pool.query(
    "INSERT INTO payroll (employee_id, hours_worked, leave_deductions, final_salary) VALUES (?, ?, ?, ?)",
    [employee_id, hours_worked, leave_deductions, final_salary]
  );
  return result.insertId;
};
