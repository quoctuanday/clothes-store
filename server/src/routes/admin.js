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
router.put(
    '/news/:id/edit-secondary-news',
    adminController.updateSecondaryNews
);
router.delete('/news/:type/:id', adminController.deleteNews);

router.put('/orders/status/:id', adminController.handleFormActions);

router.put('/orders/:id', adminController.updateOrder);

router.post('/orders/create', adminController.createOrder);

router.get('/', adminController.showHome);

module.exports = router;
