const express = require('express');
const { getChildren } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/children/:id', authMiddleware, getChildren);

module.exports = router;
