// backend/controllers/boardController.js
const Board = require('../models/boardSchema');

const createBoard = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const board = await Board.create({ name, user: userId });
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ message: 'Board creation failed', error: err.message });
  }
};

const getBoards = async (req, res) => {
  const userId = req.user.id;
  try {
    const boards = await Board.find({ user: userId });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Fetching boards failed', error: err.message });
  }
};

module.exports = { createBoard, getBoards };
