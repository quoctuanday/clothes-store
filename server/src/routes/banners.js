const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/BannerController');

router.put('/update/:id', bannerController.updateBanner);
router.post('/create', bannerController.createBanner);
router.delete('/deleted/:id', bannerController.deleteBanners);
router.get('/:id', bannerController.showBannerDetails);
router.get('/', bannerController.showBanners);

module.exports = router;
