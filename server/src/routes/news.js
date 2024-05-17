const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');

router.get('/:id', newsController.showNewsDetails);
router.get('/', newsController.showNews);

module.exports = router;
