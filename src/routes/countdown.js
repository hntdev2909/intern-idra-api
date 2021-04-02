const express = require('express');
const router = express.Router();

const countdownController = require('../app/controllers/CountdownController');

router.get('/', countdownController.index);
router.post('/', countdownController.create);

module.exports = router;
