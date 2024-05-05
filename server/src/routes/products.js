const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/:id', productController.showProductDetails);
router.get('/', productController.showProducts);

module.exports = router;
