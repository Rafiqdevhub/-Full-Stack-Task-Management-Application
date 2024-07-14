const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      user: req.user._id,
      title,
      description,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      res.json({ message: "Task removed" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
