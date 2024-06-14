const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');

router.put('/orders/status/:id', adminController.handleFormActions);

router.put('/orders/:id', adminController.updateOrder);

router.post('/orders/create', adminController.createOrder);

router.get('/', adminController.showHome);

module.exports = router;
