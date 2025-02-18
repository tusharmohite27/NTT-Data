const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let employees = [];
let nextId = 1;

app.get("/api/employees", (req, res) => {
	res.json(employees);
});

app.get("/api/employees/:id", (req, res) => {
	const employee = employees.find((emp) => emp.id === parseInt(req.params.id));
	if (!employee) {
		return res.status(404).json({ message: "Employee not found" });
	}
	res.json(employee);
});

app.post("/api/employees", (req, res) => {
	const employee = {
		id: nextId++,
		name: req.body.name,
		position: req.body.position,
		department: req.body.department,
		salary: req.body.salary,
	};

	employees.push(employee);
	res.status(201).json(employee);
});

app.put("/api/employees/:id", (req, res) => {
	const employee = employees.find((emp) => emp.id === parseInt(req.params.id));
	if (!employee) {
		return res.status(404).json({ message: "Employee not found" });
	}

	employee.name = req.body.name || employee.name;
	employee.position = req.body.position || employee.position;
	employee.department = req.body.department || employee.department;
	employee.salary = req.body.salary || employee.salary;

	res.json(employee);
});

app.delete("/api/employees/:id", (req, res) => {
	const employeeIndex = employees.findIndex(
		(emp) => emp.id === parseInt(req.params.id)
	);
	if (employeeIndex === -1) {
		return res.status(404).json({ message: "Employee not found" });
	}

	employees.splice(employeeIndex, 1);
	res.status(204).send();
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
