const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');

router.get('/totalAmounts', adminController.showTotalAmounts);
router.get('/', adminController.showHome);

module.exports = router;
