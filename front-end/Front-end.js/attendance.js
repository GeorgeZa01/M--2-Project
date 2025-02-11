fetch("http://localhost:3030/api/attendanceRoute")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Debugging line to inspect API response
    const contentDiv = document.getElementById("content");

    data.attendanceAndLeave?.forEach((employee) => {
      const employeeSection = document.createElement("div");
      employeeSection.classList.add("employee-section", "mb-5");

      // Employee Name
      const employeeName = document.createElement("h2");
      employeeName.textContent = `${employee.name} (ID: ${employee.employeeId})`;
      employeeSection.appendChild(employeeName);

      // Attendance Section
      if (employee.attendance && employee.attendance.length > 0) {
        const attendanceHeading = document.createElement("h3");
        attendanceHeading.textContent = "Attendance Records";
        employeeSection.appendChild(attendanceHeading);

        const attendanceTable = document.createElement("table");
        attendanceTable.classList.add("table", "table-bordered");
        attendanceTable.innerHTML = `
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${employee.attendance
              .map(
                (att) => `
                <tr>
                  <td>${att.date}</td>
                  <td>${att.status}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        `;
        employeeSection.appendChild(attendanceTable);
      }

      // Leave Requests Section (Separate from Attendance)
      if (employee.leaveRequests && employee.leaveRequests.length > 0) {
        const leaveRequestsSection = document.createElement("div");
        leaveRequestsSection.classList.add("leave-section");

        const leaveRequestsHeading = document.createElement("h3");
        leaveRequestsHeading.textContent = "Leave Requests";
        leaveRequestsSection.appendChild(leaveRequestsHeading);

        const leaveTable = document.createElement("table");
        leaveTable.classList.add("table", "table-striped", "table-bordered");
        leaveTable.innerHTML = `
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${employee.leaveRequests
              .map(
                (leave, index) => `
                <tr data-employee-id="${employee.employeeId}" data-leave-index="${index}">
                  <td>${leave.date}</td>
                  <td>${leave.reason}</td>
                  <td class="leave-status">${leave.status}</td>
                  <td>
                    <button class="btn btn-success btn-sm" onclick="approveLeave(${employee.employeeId}, ${index})">Approve</button>
                    <button class="btn btn-danger btn-sm" onclick="denyLeave(${employee.employeeId}, ${index})">Deny</button>
                  </td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        `;
        leaveRequestsSection.appendChild(leaveTable);
        employeeSection.appendChild(leaveRequestsSection);
      }

      // Add a horizontal separator
      const hr = document.createElement("hr");
      hr.style.width = "100%";
      employeeSection.appendChild(hr);

      contentDiv.appendChild(employeeSection);
    });
  })
  .catch((error) => {
    console.error("Error fetching the data from API:", error);
  });


// Fetch the employee names and populate the dropdownwindow.onload = async function () {
 
  window.onload = async function () {
    try {
      const res = await fetch("http://localhost:3030/api/employees");
      const {attendanceAndLeave} = await res.json();
     

      console.log("Employees API Response:", attendanceAndLeave); // Debugging line
  
      // Ensure data.employees exists and is an array
      if (!attendanceAndLeave || !Array.isArray(attendanceAndLeave)) {
        console.error("Invalid API response. Expected an array under 'employees'.", attendanceAndLeave);
        alert("Failed to load employees. Please check the API response.");
        return;
      }
  
      const employeeSelect = document.getElementById("employeeId");
      employeeSelect.innerHTML = `<option value="">Select an Employee</option>`;
  
      attendanceAndLeave?.forEach((employee) => {
        const option = document.createElement("option");
        console.log(employee)

        // Use correct key depending on API structure
        option.value = employee.employeeId ?? employee.employee_id; 
        option.textContent = employee.name;
        employeeSelect.appendChild(option);
      });
    } catch (error) {
       console.error("Error fetching employees:", error);
       alert("Failed to load employees. Please try again.");
     }
  };
  

// Submit attendance form
document.getElementById("attendanceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const employee_id = document.getElementById("employeeId").value;
  const attendanceDate = document.getElementById("attendanceDate").value;
  const status = document.getElementById("status").value;

console.log(JSON.stringify({
  employee_id,
  attendanceDate,
  status,
}))
  // Send a POST request to the backend to add attendance
  fetch("http://localhost:3030/api/attendanceRoute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employee_id,
      attendanceDate,
      status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert("Attendance added successfully!");
        // Optionally, refresh the attendance data or update the UI
      } else {
        alert("Error adding attendance");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error adding attendance");
    });
});