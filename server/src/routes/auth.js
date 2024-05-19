const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/login/me', authController.getUser);
router.post('/login', authController.login);
router.post('/logout', authController.logOut);
router.post('/signin', authController.registerData);

module.exports = router;
