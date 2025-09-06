const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

router.get('/check', blockchainController.checkBlockchain);

module.exports = router;
