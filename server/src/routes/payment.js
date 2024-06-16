const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.get('/vnpay/callback', PaymentController.callbackVnpay);
router.post('/vnpay/create', PaymentController.createPayment);
router.post('/transactions-status', PaymentController.transactionsStatus);
router.post('/callback', PaymentController.callback);
router.post('/', PaymentController.payment);

module.exports = router;
