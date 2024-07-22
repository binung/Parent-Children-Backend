const express = require('express');
const { blockApp } = require('../controllers/appController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/block-app/:id', authMiddleware, blockApp)

module.exports = router;
