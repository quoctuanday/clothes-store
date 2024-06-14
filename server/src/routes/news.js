const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');

router.get('/', newsController.showNews);
router.get('/create-main-news', newsController.createMainNews); 
router.get('/create-secondary-news', newsController.createSecondaryNews);
router.post('/store-main-news', newsController.storeMainNews);
router.post('/store-secondary-news', newsController.storeSecondaryNews);
router.get('/edit-main-news/:id', newsController.editMainNews); 
router.get('/edit-secondary-news/:id', newsController.editSecondaryNews); 
router.put('/edit-main-news/:id', newsController.updateMainNews); 
router.put('/edit-secondary-news/:id', newsController.updateSecondaryNews);
router.delete('/:type/:id', newsController.deleteNews); 
router.get('/:id', newsController.showNewsDetails);

module.exports = router;
