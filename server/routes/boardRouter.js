// backend/routes/boardRoutes.js
const express = require('express');
const { createBoard, getBoards } = require('../controller/boardController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, createBoard);
router.get('/', protect, getBoards);

module.exports = router;
