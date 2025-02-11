import express from "express";
import { loginController } from "../controllers/loginController.js";

const router = express.Router();

// Login API
router.post("/", loginController);

export default router;
