import { getPayroll, addPayroll, getSinglePayroll } from "../models/payrollModel.js";

export const fetchPayroll = async (req, res) => {
  try {
    const payroll = await getPayroll();
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getSinglePayrollCon = async (req, res) => {
  try {
    const singlePayroll = await getSinglePayroll(req.params.employee_id);
    res.json(singlePayroll)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const createPayroll = async (req, res) => {
  try {
    const { employee_id, hours_worked, leave_deductions } = req.body;
    if (!employee_id || !hours_worked || !leave_deductions) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hourlyRate = 100; // Set dynamically if needed
    const final_salary = (hours_worked * hourlyRate) - leave_deductions * 100;

    const insertId = await addPayroll(employee_id, hours_worked, leave_deductions, final_salary);
    res.status(201).json({ message: "Payroll added", payrollId: insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
