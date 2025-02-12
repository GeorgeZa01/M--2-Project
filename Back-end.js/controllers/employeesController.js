import { getEmployees,deleteEmployees,insertEmployees,updateEmployees } from "../models/employeesModel.js";

const getEmployeesController = async (req, res) => {
    res.json({employees:await getEmployees()})
}
 
const postEmployeesController = async (req, res) => {
    let {employeee_id,name, position, department, salary, employmentHistory, contact} = req.body
    res.json({employees:await insertEmployees(employeee_id,name, position, department, salary, employmentHistory, contact)})
}

const deleteEmployeesController = async (req, res) => {
    res,json({employees:await deleteEmployees(req.params.id)})
}

const editEmployeesController = async (req, res) => {
    let {employeee_id,name, position, department, salary, employmentHistory, contact, employee_id
} = req.body
    res,json({employees:await updateEmployees(employeee_id,name, position, department, salary, employmentHistory, contact,employee_id)})
}

export {getEmployeesController,postEmployeesController,deleteEmployeesController,editEmployeesController}