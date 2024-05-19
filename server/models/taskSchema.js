// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'To Do' },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
});

module.exports = mongoose.model('Task', TaskSchema);
