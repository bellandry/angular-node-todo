const Task = require("../models/Task");
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() == "") {
    return res.status(400).json({ message: "Title can't be empty." });
  }
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const taskExists = await taskExist(req, res);
  if (!taskExists) return;

  if (!title || title.trim() == "") {
    return res.status(400).json({ message: "Title can't be empty." });
  }
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    req.body,
    {
      new: true,
    }
  );
  res.json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const taskExists = await taskExist(req, res);
  if (!taskExists) return;

  await Task.findOneAndDelete({ _id: id, userId: req.user.id });
  res.json({ message: "Task deleted" });
};

const taskExist = async (req, response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid task ID." });
  }

  const task = await Task.findById(id);
  if (!task) {
    response.status(404).json({ message: "Task not found." });
    return false;
  }
  if (task.userId != req.user.id) {
    response.status(401).json({ message: "Access denied" });
    return false;
  }
  return true;
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
