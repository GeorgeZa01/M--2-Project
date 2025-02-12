const fetchPayroll = async () => {
  try {
      const response = await fetch("http://localhost:3030/api/payroll");
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const rows  = await response.json();

      const tableBody = document.getElementById("payrollTable");
      tableBody.innerHTML = "";
      rows.forEach((employee) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${employee.employee_id}</td>
              <td>${employee.hours_worked}</td>
              <td>${employee.leave_deductions}</td>
              <td>R${employee.final_salary}</td>
              <td><button class="btn btn-primary btn-sm" onclick="generatePayslip(${employee.employee_id})">View Payslip</button></td>
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error("Error fetching payroll data:", error);
  }
};

fetchPayroll();
  
  async function generatePayslip(employee_id) {
    
    const response = await fetch(`http://localhost:3030/api/payroll/${employee_id}`);
    const [data] = await response.json();
    console.log(data);
  
    const payslipContent = `
      <p><strong>Employee ID:</strong> ${data.employee_id}</p>
      <p><strong>Hours Worked:</strong> ${data.hours_worked}</p>
      <p><strong>Hourly Rate:</strong> R${(data.final_salary , data.hours_worked)}</p>
      <p><strong>Annual Salary:</strong> R${data.final_salary * 12}</p>
      <p><strong>Leave Deductions:</strong> ${data.leave_deductions}</p>
      <p><strong>Salary:</strong> R${data.final_salary}</p>
    `;
    console.log(payslipContent)
    document.getElementById("payslipContent").innerHTML = payslipContent;
    document.getElementById("payslip").style.display="block";
    console.log(document.getElementById("payslipContent").innerHTML)
  }  
 

  async function Pay() {
    const payslipContent = document.getElementById("payslipContent").innerHTML;
    if (!payslipContent) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No employee selected for payment!",
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Paid successfully!",
    });

    document.getElementById("payslip").classList.add("hidden");
    fetchPayroll(); // Refresh the table to update the "Paid" status
}
