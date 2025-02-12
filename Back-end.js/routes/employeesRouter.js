import express from "express"
import { getEmployeesController,postEmployeesController,deleteEmployeesController,editEmployeesController } from "../controllers/employeesController.js"

const router = express.Router()

router.get("/",getEmployeesController)
router.post("/",postEmployeesController)
router.delete("/employee_id",deleteEmployeesController)
router.patch("/employee_id",editEmployeesController)

export default router
