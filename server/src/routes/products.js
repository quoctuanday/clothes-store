const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.put('/update/:id', productController.updateProduct);
router.post('/create', productController.createProduct);
router.delete('/deleted/:id', productController.deleteProducts);
router.get('/:id', productController.showProductDetails);
router.get('/', productController.showProducts);

module.exports = router;
