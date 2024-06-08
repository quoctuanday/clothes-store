const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.put('/status/:id', orderController.updateOrder);
router.put('/:id', orderController.cancelOrder);
router.get('/', orderController.showOrder);

module.exports = router;
