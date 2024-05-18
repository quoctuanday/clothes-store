const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/login/me', authController.getUser);
router.post('/login', authController.login);

module.exports = router;
