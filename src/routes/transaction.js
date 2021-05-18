const express = require('express');
const router = express.Router();

const TransactionController = require('../app/controllers/TransactionController');

router.get('/', TransactionController.index);
router.post('/', TransactionController.create);

module.exports = router;
