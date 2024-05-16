const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/BannerController');

router.get('/', bannerController.showBanners);

module.exports = router;
