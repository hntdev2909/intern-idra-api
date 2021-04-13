const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.post('/', userController.create);

module.exports = router;
