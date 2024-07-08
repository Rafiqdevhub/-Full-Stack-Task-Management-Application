const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const task = new Task({
    user: req.user._id,
    title,
    description,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = title;
    task.description = description;
    task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.remove();
    res.json({ message: "Task removed" });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask };
