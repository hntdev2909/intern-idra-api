const express = require('express');
const router = express.Router();

const taskManageController = require('../app/controllers/TaskManageController');

router.get('/', taskManageController.index);
router.post('/create/task', taskManageController.createTask);
router.post('/create/columns', taskManageController.createColumns);
router.post('/create/columnorder', taskManageController.createColumnOrder);
router.put('/tasks/:id', taskManageController.editTasks);
router.put('/columns', taskManageController.editColumns);
router.delete('/delete/:id', taskManageController.destroy);

module.exports = router;
