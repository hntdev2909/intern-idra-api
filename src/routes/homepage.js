const express = require('express');
const router = express.Router();

const HomepageController = require('../app/controllers/HomepageController');

router.get('/', HomepageController.index);

module.exports = router;
