import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import bodyParser from "body-parser";

// Import routes
import employeesRouter from "../Back-end.js/routes/employeesRouter.js";
import timeoffRouter from "../Back-end.js/routes/timeoffRouter.js";
import login_route from "./routes/loginRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import payrollRoutes from "./routes/payrollRoute.js";

config();
const app = express();
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use('/api/login', login_route);
app.use("/api/attendanceRoute", attendanceRoute);
app.use("/api/employees", attendanceRoute);
app.use('/api/employees', employeesRouter);
app.use('/api/timeoff', timeoffRouter);
app.use("/api/payroll", payrollRoutes);



// Basic route to serve HTML pages
app.get('/employees', (req, res) => {
  res.sendFile(process.cwd() + '/views/employees.html');
});
app.get('/timeoff', (req, res) => {
  res.sendFile(process.cwd() + '/views/Timeoff.html');
});
app.get('/api/payroll', (req,res)=>{
  res.sendFile(process.cwd() + '/views/attendance_leave.html')
});

app.use(express.static('public')); // Serve static assets


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
