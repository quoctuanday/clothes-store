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

    deleteBanners(req, res, next) {
        Banner.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => {
                console.error('Lỗi khi xóa banner: ', err);
                next(err);
            });
    }
    createBanner(req, res, next) {
        const formData = req.body;
        const banner = new Banner(formData);
        banner
            .save()
            .then(() => res.send('create banner successfully'))
            .catch(err => {
                console.error('Lỗi khi tạo sản phẩm: ', err);
                next(err);
            });
    }

    updateBanner(req, res, next) {
        Banner.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('update banner successfully'))
            .catch(err => {
                console.error('Lỗi khi update banner: ', err);
                next(err);
            });
    }

    showBannerDetails(req, res, next) {
        const bannerId = req.params.id;
        Banner.findById(bannerId)
            .then(banner => {
                res.json({ banner: mongooseToObject(banner) });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra chi tiet banner:', error);
                next(error);
            });
    }
}

module.exports = new BannerController();
