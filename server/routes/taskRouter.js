// backend/routes/taskRoutes.js
const express = require('express');
const { createTask, getTasks, deleteTask } = require('../controller/taskController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, createTask);
router.get('/:boardId', protect, getTasks);
router.delete('/:id',protect,deleteTask);

module.exports = router;

