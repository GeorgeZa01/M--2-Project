// Get employee names and IDs
app.get("/api/employees/names", async (req, res) => {
  try {
    const [employees] = await pool.query("SELECT employee_id, name FROM Employees");
    res.json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get attendance data
app.get("/api/attendance", async (req, res) => {
  try {
    const [attendanceData] = await pool.query(`
      SELECT e.name, a.attendance_date, a.status, e.employee_id
      FROM Attendance a
      JOIN Employees e ON a.employee_id = e.employee_id
      ORDER BY e.employee_id, a.attendance_date ASC
    `);

    const transformedData = [];

    for (const entry of attendanceData) {
      const existingEmployee = transformedData.find(
        (emp) => emp.employeeId === entry.employee_id
      );

      if (!existingEmployee) {
        transformedData.push({
          employeeId: entry.employee_id,
          name: entry.name,
          attendance: [
            {
              date: entry.attendance_date,
              status: entry.status,
            },
          ],
        });
      } else {
        existingEmployee.attendance.push({
          date: entry.attendance_date,
          status: entry.status,
        });
      }
    }

    res.json({ attendanceAndLeave: transformedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add attendance entry
app.post("/api/attendance", async (req, res) => {
  const { employee_id, attendanceDate, status } = req.body;

  if (!employee_id || !attendanceDate || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Attendance (employee_id, attendance_date, status) VALUES (?, ?, ?)`,
      [employee_id, attendanceDate, status]
    );

    res.status(201).json({ message: "Attendance record added successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all employees
app.get("/api/employees", async (req, res) => {
  console.log("Fetching employees...");
  try {
    const [employees] = await pool.query("SELECT employee_id, name FROM employees");
    console.log("Employees fetched:", employees);
    res.json(employees);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// POST route to handle the time off request submission
app.post("/api/timeoff", async (req, res) => {
  try {
      const { employee_id, beginning_date, ending_date, reason, status } = req.body;
      const [rows] = await pool.query(
          "INSERT INTO leave_request (employee_id, beginning_date, ending_date, reason, status) VALUES (?, ?, ?, ?, ?)",
          [employee_id, beginning_date, ending_date, reason, status]
      );
      res.status(201).json({ message: "Time off request submitted successfully", rows });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while submitting the request" });
  }
});




