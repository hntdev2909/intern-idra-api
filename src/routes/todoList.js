const express = require('express');
const router = express.Router();

const todoListController = require('../app/controllers/TodoListController');

router.get('/', todoListController.index);
router.post('/create', todoListController.create);
router.put('/change', todoListController.change);
router.put('/:id', todoListController.edit);
router.delete('/delete', todoListController.destroyAll);
router.delete('/:id', todoListController.destroy);

module.exports = router;
