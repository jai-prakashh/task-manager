const express = require("express");
const Task = require("../models/task");
const { protect } = require("../middleware/authMiddleware"); // Assuming middleware for auth

const router = express.Router();

// Get all tasks
router.get("/", protect, async (req, res, next) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Create a task
router.post("/", protect, async (req, res, next) => {
  const { title, description, dueDate = "" } = req.body;
  const task = new Task({ title, description, dueDate, user: req.user.id });
  await task.save();
  res.status(201).json(task);
});

// Update a task
router.put("/:id", protect, async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

// Delete a task
router.delete("/:id", protect, async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
