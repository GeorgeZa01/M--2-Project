import express from "express"; // Import Express
import { getAllRequestsController, postRequestController } from "../controllers/timeoffController.js"; // Ensure correct spelling

const router = express.Router(); // Initialize the router

// Define routes
router.post("/submit", postRequestController);
router.get("/requests", getAllRequestsController);

export default router; // Export the router
