const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role('manager'), createTodo);
router.get('/', auth, getTodos);
router.put('/:id', auth, role('manager'), updateTodo);
router.delete('/:id', auth, role('manager'), deleteTodo);

module.exports = router;

