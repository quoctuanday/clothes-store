const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/addcart', userController.addCart);
router.put('/updateProfile/:id', userController.updateProfile);

module.exports = router;
