const Task = require("../models/Task");
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() == "") {
    return res.status(400).json({ message: "Title can't be empty." });
  }
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  await taskExist(id, res);

  if (!title || title.trim() == "") {
    return res.status(400).json({ message: "Title can't be empty." });
  }
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  await taskExist(id, res);

  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
};

const taskExist = async (taskId, response) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return response.status(400).json({ message: "Invalid task ID." });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return response.status(404).json({ message: "Task not found." });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
