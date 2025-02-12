import {pool} from "../config/config.js"

const getEmployees = async () => {
    let [data] = await pool.query("SELECT employee_id, name FROM employees")
    return data
}

const deleteEmployees = async(employee_id)=>{
    await pool.query("DELETE FROM `employees` WHERE (`employee_id` = ?)" ,[employee_id] )
    return await getEmployees()
}


const insertEmployees = async (employee_id,name, position, department, salary, employmentHistory, contact) => {
    await pool.query(
        "INSERT INTO employees (employee_id, name, position, department, salary, employmentHistory, contact) VALUES (?, ?, ?, ?, ?, ?,?)",
        [employee_id,name, position, department, salary, employmentHistory, contact]
    );
    return await getEmployees();
};

const updateEmployees = async ( name, position, department, salary, employmentHistory, contact,employee_id) => {
    await pool.query(
        "UPDATE `employees` SET `name` = ?, `position` = ?, `department` = ?, `salary` = ?, `employmentHistory` = ?, `contact` = ? WHERE (`employee_id` = ?)",
        [name, position, department, salary, employmentHistory, contact, employee_id]
    );
    return await getEmployees();
};

export {getEmployees, deleteEmployees, insertEmployees, updateEmployees}