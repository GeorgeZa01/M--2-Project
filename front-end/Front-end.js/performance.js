const API_URL = "http://localhost:3030/api/performance";
let selectedEmployee = null;
document.addEventListener("DOMContentLoaded", () => {
  fetchEmployees();
});
// Function to fetch employees and their performance reviews
function fetchEmployees() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      renderEmployeeTable(data);
    })
    .catch((error) => console.error("Error fetching employees:", error));
}
// Function to render the employee table
function renderEmployeeTable(employees) {
  const tableBody = document.getElementById("employeeTable");
  tableBody.innerHTML = "";
  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.employee_id}</td>
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.department}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="viewReviews(${employee.employee_id})">
          View/Add Reviews
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
// Function to fetch and display employee reviews in a modal
function viewReviews(employee_id) {
  fetch(`${API_URL}/${employee_id}`)
    .then((response) => response.json())
    .then((data) => {
      selectedEmployee = data.employee;
      const reviewContent = document.getElementById("reviewContent");
      reviewContent.innerHTML = selectedEmployee.reviews.length
        ? `<ul>${selectedEmployee.reviews.map((review) => `<li>${review.review}</li>`).join("")}</ul>`
        : "<p>No reviews available.</p>";
      document.getElementById("newReview").value = ""; // Clear input
      new bootstrap.Modal(document.getElementById("reviewModal")).show();
    })
    .catch((error) => console.error("Error fetching review:", error));
}
// Function to add a new review
function addReview() {
  const newReview = document.getElementById("newReview").value.trim();
  if (!newReview || !selectedEmployee) {
    alert("Review cannot be empty!");
    return;
  }
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      review: newReview,
      employee_id: selectedEmployee.employee_id,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      document.getElementById("newReview").value = "";
      viewReviews(selectedEmployee.employee_id); // Refresh modal with new reviews
      fetchEmployees(); // Refresh table with updated reviews
    })
    .catch((error) => console.error("Error adding review:", error));
}