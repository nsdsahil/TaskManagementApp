// backend/controllers/taskController.js
const Task = require('../models/taskSchema');

const createTask = async (req, res) => {
  const { title, description, status, boardId } = req.body;
  try {
    const task = await Task.create({ title, description, status, board: boardId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Task creation failed', error: err.message });
  }
};

const getTasks = async (req, res) => {
  const { boardId } = req.params;
  try {
    const tasks = await Task.find({ board: boardId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Fetching tasks failed', error: err.message });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
	const task = await Task.findByIdAndDelete(id);
	res.json(task);
  } catch (err) {
	res.status(500).json({ message: 'Task deletion failed', error: err.message });
  }
};

module.exports = { createTask, getTasks, deleteTask };
