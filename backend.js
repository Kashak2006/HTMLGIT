const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (local or Atlas)
mongoose.connect("mongodb://localhost:27017/smartlitERP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Example Schemas
const EmployeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  salary: Number,
});
const Employee = mongoose.model("Employee", EmployeeSchema);

const SalesSchema = new mongoose.Schema({
  month: String,
  amount: Number,
});
const Sale = mongoose.model("Sale", SalesSchema);

// Routes
app.get("/", (req, res) => {
  res.send("SmartLit ERP Backend Running 🚀");
});

// HR Module
app.get("/api/hr/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Finance Module
app.get("/api/finance/revenue", async (req, res) => {
  const sales = await Sale.find();
  const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
  res.json({ revenue: totalRevenue });
});

// Sales Module
app.get("/api/sales", async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

// Start Server
app.listen(5000, () => {
  console.log("SmartLit ERP backend running on http://localhost:5000");
});
