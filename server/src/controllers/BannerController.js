const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Banner = require('../models/Banner');

class BannerController {
    showBanners(req, res, next) {
        Banner.find({})
            .then(banners => {
                res.json({
                    banners: multipleMongooseToObject(banners),
                });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra danh sách banner:', error);
                next(error);
            });
    }
}

module.exports = new BannerController();
