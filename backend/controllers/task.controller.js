const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

const createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

module.exports = { getTasks, createTask };
