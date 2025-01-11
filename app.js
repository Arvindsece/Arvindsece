const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json()); // Middleware

// MongoDB Connection
mongoose
  .connect("mongodb+srv://arvindb2023cce:arvindcce@cluster0.vppiw.mongodb.net/expense")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Schema
const expenseSchema = new mongoose.Schema({
  Id: { type: String, required: true, unique: true }, // Unique ID
  Title: { type: String, required: true },
  Amount: { type: Number, required: true },
});

// Mongoose Model
const Expenses = mongoose.model("Expenses", expenseSchema);

// Route: Get All Expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// Route: Get Expense by Id
app.get("/api/expenses/:Id", async (req, res) => {
  try {
    const { Id } = req.params;
    const expense = await Expenses.findOne({ Id }); // Query by custom Id
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expense" });
  }
});

// Route: Create Expense
app.post("/api/expenses", async (req, res) => {
  try {
    const { Title, Amount } = req.body;
    const newExpense = new Expenses({
      Id: uuidv4(), // Generate unique ID
      Title,
      Amount,
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error in creating expense" });
  }
});

// Route: Update Expense by Id
app.put("/api/expenses/:Id", async (req, res) => {
  const { Id } = req.params;
  const { Title, Amount } = req.body;
  try {
    const updatedExpense = await Expenses.findOneAndUpdate(
      { Id },
      { Title, Amount },
      { new: true } // Return the updated document
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error in updating expense" });
  }
});

// Route: Delete Expense by Id
app.delete("/api/expenses/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    const deletedExpense = await Expenses.findOneAndDelete({ Id });
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting expense" });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});