// Employee data as a flat array
const employees = [
  {
    employeeId: 1,
    name: "Sibongile Nkosi",
    position: "Software Engineer",
    department: "Development",
    salary: 70000,
    employmentHistory: "Joined in 2015, promoted to Senior in 2018",
    contact: "sibongile.nkosi@moderntech.com",
  },
  {
    employeeId: 2,
    name: "Lungile Moyo",
    position: "HR Manager",
    department: "HR",
    salary: 80000,
    employmentHistory: "Joined in 2013, promoted to Manager in 2017",
    contact: "lungile.moyo@moderntech.com",
  },
  {
    employeeId: 3,
    name: "Thabo Molefe",
    pwd: "password",
    position: "Quality Analyst",
    department: "QA",
    salary: 55000,
    employmentHistory: "Joined in 2018",
    contact: "thabo.molefe@moderntech.com",
  },
  {
    employeeId: 4,
    name: "Keshav Naidoo",
    pwd: "password",
    position: "Sales Representative",
    department: "Sales",
    salary: 60000,
    employmentHistory: "Joined in 2020",
    contact: "keshav.naidoo@moderntech.com",
  },
  {
    employeeId: 5,
    name: "Zanele Khumalo",
    pwd: "password",
    position: "Marketing Specialist",
    department: "Marketing",
    salary: 58000,
    employmentHistory: "Joined in 2019",
    contact: "zanele.khumalo@moderntech.com",
  },
  {
    employeeId: 6,
    name: "Sipho Zulu",
    pwd: "password",
    position: "UI/UX Designer",
    department: "Design",
    salary: 65000,
    employmentHistory: "Joined in 2016",
    contact: "sipho.zulu@moderntech.com",
  },
  {
    employeeId: 7,
    name: "Naledi Moeketsi",
    pwd: "password",
    position: "DevOps Engineer",
    department: "IT",
    salary: 72000,
    employmentHistory: "Joined in 2017",
    contact: "naledi.moeketsi@moderntech.com",
  },
  {
    employeeId: 8,
    name: "Farai Gumbo",
    pwd: "password",
    position: "Content Strategist",
    department: "Marketing",
    salary: 56000,
    employmentHistory: "Joined in 2021",
    contact: "farai.gumbo@moderntech.com",
  },
  {
    employeeId: 9,
    name: "Karabo Dlamini",
    pwd: "password",
    position: "Accountant",
    department: "Finance",
    salary: 62000,
    employmentHistory: "Joined in 2018",
    contact: "karabo.dlamini@moderntech.com",
  },
  {
    employeeId: 10,
    name: "Fatima Patel",
    pwd: "password",
    position: "Customer Support Lead",
    department: "Support",
    salary: 58000,
    employmentHistory: "Joined in 2016",
    contact: "fatima.patel@moderntech.com",
  },
];

const employeeCardsContainer = document.getElementById("employee-cards");

// Function to display all employees as cards
function displayEmployees() {
  employeeCardsContainer.innerHTML = ""; // Clear existing cards
  employees.forEach((employee) => {
    const card = document.createElement("div");
    card.className = "card";

    // Populate employee card content
    card.innerHTML = `
            <h3>${employee.name}</h3>
            <p><strong>Position:</strong> ${employee.position}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Salary:</strong> R${employee.salary}</p>
            <p><strong>Employment History:</strong> ${employee.employmentHistory}</p>
            <p><strong>Contact:</strong> ${employee.contact}</p>
            <button class="btn btn-danger" onclick="updateEmployee(${employee.employeeId})">Update</button>
            <button class="btn btn-danger" onclick="removeEmployee(${employee.employeeId})">Remove</button>
        `;

    employeeCardsContainer.appendChild(card);
  });
}

// Function to handle adding a new employee
document
  .getElementById("add-employee-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form reload

    // Get form values
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const department = document.getElementById("department").value;
    const salary = parseFloat(document.getElementById("salary").value);
    const employmentHistory =
      document.getElementById("employmentHistory").value;
    const contact = document.getElementById("contact").value;

    // Create a new employee object
    const newEmployee = {
      employeeId: employees.length + 1,
      name,
      position,
      department,
      salary,
      employmentHistory,
      contact,
    };

    employees.push(newEmployee); // Add to the employee list
    displayEmployees(); // Refresh the cards display
    this.reset(); // Clear the form
  });

// Function to remove an employee by ID
function updateEmployee(id, updatedInfo) {
  const index = employees.findIndex((employee) => employee.employeeId === id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedInfo }; // Update the employee with new info
    displayEmployees(); // Refresh the cards display
  }
}
function removeEmployee(id) {
  const index = employees.findIndex((employee) => employee.employeeId === id);
  if (index !== -1) {
    employees.splice(index, 1); // Remove the employee
    displayEmployees(); // Refresh the cards display
  }
}

// Initial display of employees
displayEmployees();
