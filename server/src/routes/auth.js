const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/login/me', authController.getUser);
router.put('/newpass/:id', authController.newpass);
router.post('/sendmail', authController.resetPassword);
router.post('/login', authController.login);
router.post('/logout', authController.logOut);
router.post('/signin', authController.registerData);

module.exports = router;
