document.addEventListener("DOMContentLoaded", async function () {
    const employeeDropdown = document.getElementById("employeeName");
    const reasonDropdown = document.getElementById("reason");
    const otherReasonInput = document.getElementById("otherReason");

    // Fetch Employees from API
    async function fetchEmployees() {
        // try {
            const response = await fetch("http://localhost:3000/api/employees");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const employees = await response.json();
            employeeDropdown.innerHTML = `<option value="">-- Select Employee --</option>`; // Reset dropdown
            
            employees.forEach(emp => {
                const option = document.createElement("option");
                option.value = emp.employee_id; // Ensure correct field name
                option.textContent = emp.name;
                employeeDropdown.appendChild(option);
            });
        // } catch (error) {
        //     console.error("Error fetching employees:", error);
        //     alert("Failed to load employees. Please try again later.");
        // }
    }

    // Show input field if "Others" is selected
    reasonDropdown.addEventListener("change", function () {
        if (this.value === "Others") {
            otherReasonInput.style.display = "block";
            otherReasonInput.setAttribute("required", "true");
        } else {
            otherReasonInput.style.display = "none";
            otherReasonInput.removeAttribute("required");
        }
    });

    // Handle form submission
    document.getElementById("timeOffForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            employee_id: employeeDropdown.value,
            beginning_date: document.getElementById("startDate").value,
            ending_date: document.getElementById("endDate").value,
            reason: reasonDropdown.value === "Others" ? otherReasonInput.value : reasonDropdown.value,
            status: "Pending"
        };

        if (!formData.employee_id) {
            Swal.fire("Error", "Please select an employee", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/timeoff", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                Swal.fire("Success", "Your time off request has been submitted!", "success");
                this.reset();
            } else {
                Swal.fire("Error", "Failed to submit request", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong!", "error");
        }
    });

    // Load employees when the page loads
    await fetchEmployees();
});
