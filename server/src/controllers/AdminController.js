const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Banner = require('../models/Banner');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const MainNews = require('../models/MainNews');
const SecondaryNews = require('../models/SecondaryNews');

class AdminController {
    showHome(req, res, next) {
        const productCountPromise = Product.countDocuments({});
        const bannerCountPromise = Banner.countDocuments({});
        const userCountPromise = User.countDocuments({});
        const newsCountPromise = SecondaryNews.countDocuments({});
        const soldPromise = Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalSold: { $sum: '$quantitySold' },
                },
            },
        ]);
        const revenuePromise = Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: { $multiply: ['$quantitySold', '$price'] },
                    },
                },
            },
        ]);
        const paidOrderCountPromise = Order.countDocuments({
            paymentStatus: 'Đã thanh toán',
        });

        Promise.all([
            productCountPromise,
            bannerCountPromise,
            userCountPromise,
            newsCountPromise,
            soldPromise,
            revenuePromise,
            paidOrderCountPromise,
        ])
            .then(
                ([
                    productCount,
                    bannerCount,
                    userCount,
                    newsCount,
                    soldResult,
                    revenueCount,
                    orderCount,
                ]) => {
                    const soldCount =
                        soldResult.length > 0 ? soldResult[0].totalSold : 0;
                    const totalRevenue =
                        revenueCount.length > 0
                            ? revenueCount[0].totalRevenue
                            : 0;
                    res.json({
                        productCount,
                        soldCount,
                        bannerCount,
                        userCount,
                        newsCount,
                        totalRevenue,
                        orderCount,
                    });
                }
            )
            .catch(error => {
                console.error('Lỗi khi đếm số lượng sản phẩm:', error);
                next(error);
            });
    }

    showTotalAmounts(req, res, next) {
        const paidOrderRevenuePromise = Order.aggregate([
            {
                $match: {
                    paymentStatus: 'Đã thanh toán',
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                    },
                    totalRevenue: { $sum: '$totalAmount' },
                },
            },
            {
                $sort: {
                    '_id.month': 1, // Sắp xếp theo tháng tăng dần
                },
            },
        ]);

        paidOrderRevenuePromise
            .then(paidOrderRevenue => {
                res.json({
                    paidOrderRevenue,
                });
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu:', error);
                next(error);
            });
    }

    showNews(req, res, next) {
        Promise.all([MainNews.find({}), SecondaryNews.find({})])
            .then(([mainNews, secondaryNews]) => {
                res.render('admin/news', {
                    mainNews: multipleMongooseToObject(mainNews),
                    secondaryNews: multipleMongooseToObject(secondaryNews),
                });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra danh sách tin tức:', error);
                next(error);
            });
    }

    deleteNews(req, res, next) {
        const newsId = req.params.id;
        const newsType = req.params.type;

        if (newsType === 'main') {
            MainNews.deleteOne({ _id: newsId })
                .then(() => res.redirect('/admin/news'))
                .catch(err => {
                    console.error('Lỗi khi xóa tin tức chính: ', err);
                    next(err);
                });
        } else if (newsType === 'secondary') {
            SecondaryNews.deleteOne({ _id: newsId })
                .then(() => res.redirect('/admin/news'))
                .catch(err => {
                    console.error('Lỗi khi xóa tin tức phụ: ', err);
                    next(err);
                });
        } else {
            res.status(400).send('Invalid news type');
        }
    }

    createMainNews(req, res, next) {
        res.render('admin/create-main-news');
    }

    createSecondaryNews(req, res, next) {
        res.render('admin/create-secondary-news');
    }

    storeMainNews(req, res, next) {
        const news = new MainNews(req.body);
        news.save()
            .then(() => res.redirect('/admin/news'))
            .catch(next);
    }

    storeSecondaryNews(req, res, next) {
        const news = new SecondaryNews(req.body);
        news.save()
            .then(() => res.redirect('/admin/news'))
            .catch(next);
    }

    updateMainNews(req, res, next) {
        MainNews.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/news'))
            .catch(next);
    }

    updateSecondaryNews(req, res, next) {
        SecondaryNews.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/news'))
            .catch(next);
    }

    editMainNews(req, res, next) {
        MainNews.findById(req.params.id)
            .then(mainNews => {
                res.render('admin/edit-main-news', {
                    mainNews: mongooseToObject(mainNews),
                });
            })
            .catch(next);
    }

    editSecondaryNews(req, res, next) {
        SecondaryNews.findById(req.params.id)
            .then(secondaryNews => {
                res.render('admin/edit-secondary-news', {
                    secondaryNews: mongooseToObject(secondaryNews),
                });
            })
            .catch(next);
    }
}

module.exports = new AdminController();
