document.addEventListener("DOMContentLoaded", () => {
  const employeeCards = document.getElementById("employee-cards");
  const addEmployeeForm = document.getElementById("add-employee-form");

  // Function to fetch and display employees
  async function fetchEmployees() {
      try {
          const response = await fetch("http://localhost:3030/employees");
          const employees = await response.json();

          // Display employee cards
          employeeCards.innerHTML = employees.map(emp => `
              <div class="card">
                  <h3>${emp.name}</h3>
                  <p>Position: ${emp.position}</p>
                  <p>Department: ${emp.department}</p>
                  <p>Salary: $${emp.salary}</p>
                  <p>Email: ${emp.contact}</p>
              </div>
          `).join("");
      } catch (error) {
          console.error("Error fetching employees:", error);
      }
  }

  // Event listener for form submission
  addEmployeeForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const newEmployee = {
          employee_id: document.getElementById("employee_id").value,
          name: document.getElementById("name").value,
          position: document.getElementById("position").value,
          department: document.getElementById("department").value,
          salary: document.getElementById("salary").value,
          employmentHistory: document.getElementById("employmentHistory").value,
          contact: document.getElementById("contact").value
      };

      try {
          const response = await fetch("http://localhost:3030/employees", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newEmployee)
          });

          if (response.ok) {
              // Show success popup
              Swal.fire({
                  title: "Success!",
                  text: "A new employee has been added.",
                  icon: "success",
                  confirmButtonText: "OK"
              });

              // Reset the form
              addEmployeeForm.reset();

              // Fetch and display the updated employee list
              fetchEmployees();
          } else {
              Swal.fire("Error", "Failed to add employee", "error");
          }
      } catch (error) {
          console.error("Error adding employee:", error);
          Swal.fire("Error", "An error occurred while adding the employee", "error");
      }
  });

  // Fetch employees when the page loads
  fetchEmployees();
});
