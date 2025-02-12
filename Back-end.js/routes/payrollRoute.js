import express from "express";
import { fetchPayroll, createPayroll, getSinglePayrollCon} from "../controllers/payrollController.js";

const router = express.Router();

router.get("/", fetchPayroll);
router.post("/", createPayroll);
router.get("/:employee_id", getSinglePayrollCon)


export default router;
