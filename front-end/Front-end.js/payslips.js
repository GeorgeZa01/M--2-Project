// Payroll Data
const payrollData = [
  {
    employeeId: 1,
    hoursWorked: 160,
    leaveDeductions: 8,
    finalSalary: 69500,
    isPaid: false,
  },
  {
    employeeId: 2,
    hoursWorked: 150,
    leaveDeductions: 10,
    finalSalary: 79000,
    isPaid: false,
  },
  {
    employeeId: 3,
    hoursWorked: 170,
    leaveDeductions: 4,
    finalSalary: 54800,
    isPaid: false,
  },
  {
    employeeId: 4,
    hoursWorked: 165,
    leaveDeductions: 6,
    finalSalary: 59700,
    isPaid: false,
  },
  {
    employeeId: 5,
    hoursWorked: 158,
    leaveDeductions: 5,
    finalSalary: 57850,
    isPaid: false,
  },
  {
    employeeId: 6,
    hoursWorked: 168,
    leaveDeductions: 2,
    finalSalary: 64800,
    isPaid: false,
  },
  {
    employeeId: 7,
    hoursWorked: 175,
    leaveDeductions: 3,
    finalSalary: 71800,
    isPaid: false,
  },
  {
    employeeId: 8,
    hoursWorked: 160,
    leaveDeductions: 0,
    finalSalary: 56000,
    isPaid: false,
  },
  {
    employeeId: 9,
    hoursWorked: 155,
    leaveDeductions: 5,
    finalSalary: 61500,
    isPaid: false,
  },
  {
    employeeId: 10,
    hoursWorked: 162,
    leaveDeductions: 4,
    finalSalary: 57750,
    isPaid: false,
  },
];

// Function to render the payroll table
function renderTable() {
  const tableBody = document.getElementById("payrollTable");
  tableBody.innerHTML = ""; // Clear table before rendering
  payrollData.forEach((employee) => {
    const row = document.createElement("tr");
    const isPaidText = employee.isPaid
      ? "Paid"
      : `<button class="btn btn-primary btn-sm" onclick="generatePayslip(${employee.employeeId})">View Payslip</button>`;
    row.innerHTML = `
              <td>${employee.employeeId}</td>
              <td>${employee.hoursWorked}</td>
              <td>${employee.leaveDeductions}</td>
              <td>R${employee.finalSalary.toFixed(2)}</td>
              <td>${isPaidText}</td>
          `;
    tableBody.appendChild(row);
  });
}

// Function to generate payslip
function generatePayslip(employeeId) {
  const employee = payrollData.find(
    (emp) => emp.employeeId === employeeId
  );
  if (employee) {
    if (employee.isPaid) {
      Swal.fire("This employee has already been paid.");
      return;
    }
    const payslipContent = `
              <p><strong>Employee ID:</strong> ${employee.employeeId}</p>
              <p><strong>Hours Worked:</strong> ${employee.hoursWorked}</p>
              <p><strong>Hourly Rate:</strong> R${(
        employee.finalSalary / employee.hoursWorked
      ).toFixed(2)}</p>
              <p><strong>Annual Salary:</strong>
                R${employee.finalSalary * 12}</p>
              <p><strong>Leave Deductions:</strong> ${employee.leaveDeductions
      }</p>
              <p><strong>Salary:</strong> R${employee.finalSalary.toFixed(
        2
      )}</p>
          `;
    document.getElementById("payslipContent").innerHTML = payslipContent;
    document.getElementById("payslip").classList.remove("hidden");
  }
}

// Function to process payment
function Pay() {
  const payslipContent =
    document.getElementById("payslipContent").innerHTML;
  if (!payslipContent) {
    Swal.fire("Error", "No employee selected for payment!", "error");
    return;
  }

  const employeeId = parseInt(
    document
      .getElementById("payslipContent")
      .innerText.match(/Employee ID:\s*(\d+)/)[1]
  );
  const employee = payrollData.find(
    (emp) => emp.employeeId === employeeId
  );

  if (employee && !employee.isPaid) {
    employee.isPaid = true;
    Swal.fire(
      "Success",
      `Payment of R${employee.finalSalary.toFixed(2)} made successfully!`,
      "success"
    );
    document.getElementById("payslip").classList.add("hidden");
    renderTable(); // Refresh the table to update the "Paid" status
  } else {
    Swal.fire("Error", "This employee has already been paid.", "error");
  }
}

// Initial render
renderTable();
