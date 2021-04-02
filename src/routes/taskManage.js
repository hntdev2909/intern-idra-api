const express = require('express');
const router = express.Router();

const taskManageController = require('../app/controllers/TaskManageController');

router.get('/', taskManageController.index);

module.exports = router;
