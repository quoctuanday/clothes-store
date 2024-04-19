const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');

router.post(
    '/customers/handle-form-actions',
    adminController.handleFormActions
);
router.delete('/customers/:id', adminController.deleteCustomers);
router.delete('/banners/:id', adminController.deleteBanners);
router.delete('/products/:id', adminController.deleteProducts);

router.put('/products/:id', adminController.updateProduct);
router.get('/products/:id/edit-product', adminController.editProduct);
router.get('/banners/:id/edit-banner', adminController.editBanner);

router.post('/products/store', adminController.storeProduct);
router.get('/products/create', adminController.createProduct);
router.get('/banners/create', adminController.createBanner);

router.get('/:id/orders', adminController.showOrders);
router.get('/banners', adminController.showBanners);
router.get('/customers', adminController.showCustomers);
router.get('/products', adminController.showProducts);
router.get('/', adminController.showHome);

module.exports = router;
