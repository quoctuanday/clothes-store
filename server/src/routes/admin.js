const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');

router.get('/news', adminController.showNews);
router.get('/news/create-main-news', adminController.createMainNews);
router.get('/news/create-secondary-news', adminController.createSecondaryNews);
router.post('/news/store-main-news', adminController.storeMainNews);
router.post('/news/store-secondary-news', adminController.storeSecondaryNews);
router.get('/news/:id/edit-main-news', adminController.editMainNews);
router.get('/news/:id/edit-secondary-news', adminController.editSecondaryNews);
router.put('/news/:id/edit-main-news', adminController.updateMainNews);
router.put('/news/:id/edit-secondary-news', adminController.updateSecondaryNews);
router.delete('/news/:type/:id', adminController.deleteNews);

router.put('/orders/handle-form-actions', adminController.handleFormActions);
router.delete('/customers/:id', adminController.deleteCustomers);
router.delete('/banners/:id', adminController.deleteBanners);
router.delete('/products/:id', adminController.deleteProducts);

router.put('/banners/:id', adminController.updateBanner);
router.put('/products/:id', adminController.updateProduct);
router.put('/orders/:id', adminController.updateOrder);
router.get('/products/:id/edit-product', adminController.editProduct);
router.get('/banners/:id/edit-banner', adminController.editBanner);

router.post('/products/store', adminController.storeProduct);
router.post('/banners/store', adminController.storeBanner);
router.get('/products/create', adminController.createProduct);
router.get('/banners/create', adminController.createBanner);

router.post('/orders/create', adminController.createOrder);
router.get('/:id/orders', adminController.showOrders);
router.get('/banners', adminController.showBanners);
router.get('/customers', adminController.showCustomers);
router.get('/products', adminController.showProducts);
router.get('/', adminController.showHome);

module.exports = router;
