const express = require('express');
const { getChildren, getUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/children/:id', authMiddleware, getChildren);
router.get('/user/:id', authMiddleware, getUser)

module.exports = router;
