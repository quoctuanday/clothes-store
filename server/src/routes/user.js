const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.put('/updateProfile/:id', userController.updateProfile);

module.exports = router;
