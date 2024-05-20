const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.delete('/:id', cartController.removeItems);
router.get('/:id', cartController.showOrderDetails);
router.get('/', cartController.showItems);

module.exports = router;
