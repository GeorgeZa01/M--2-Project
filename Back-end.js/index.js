import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import login_route from "./routes/loginRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js"

config();
const app = express();
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json());


// Middleware
app.use('/api/login', login_route);
app.use("/api/attendanceRoute", attendanceRoute);
app.use("/api/employees", attendanceRoute);


// Start the server
const PORT = process.env.PORT || 3030;

app.listen (PORT, () => {
  console.log(`localhost://${PORT}`)
})

// Hash the user's password (if creating a new user)
async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export { hashPassword };
