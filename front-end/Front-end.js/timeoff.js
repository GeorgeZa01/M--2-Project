document.addEventListener("DOMContentLoaded", async function () {
    const employeeDropdown = document.getElementById("employeeName");
    const reasonDropdown = document.getElementById("reason");
    const otherReasonInput = document.getElementById("otherReason");

    // Fetch Employees from API
    async function fetchEmployees() {
        try {
            const response = await fetch("http://localhost:3030/api/employees");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            employeeDropdown.innerHTML = `<option value="">-- Select Employee --</option>`; // Reset dropdown
            employees = data.attendanceAndLeave
            console.log(employees)
            employees?.forEach(emp => {
                const option = document.createElement("option");
                option.value = emp.name; // Ensure correct field name
                option.textContent = emp.name;
                employeeDropdown.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching employees:", error);
            alert("Failed to load employees. Please try again later.");
        }
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
            todaysDate: document.getElementById("todaysDate").value ||null,
            employeeName: document.getElementById("employeeName").value ||null, // Just use .value directly
            startDate: document.getElementById("startDate").value ||null,
            endDate: document.getElementById("endDate").value ||null,
            reasons: reasonDropdown.value === "Others" ? otherReasonInput.value : reasonDropdown.value ||null,
            status: "Pending"
        };
        
        // console.log("Form Data:", formData); // Log to verify
        
        
        try {
            console.log("Form Data:", formData); // Log to verify
            const response = await fetch("http://localhost:3030/api/timeoff/submit", {
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
            console.log("1",error);
        }
    });

    // Load employees when the page loads
    await fetchEmployees();
});

function logout () {
    window.location.href = "../index.html";
}