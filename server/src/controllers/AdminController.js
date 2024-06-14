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

}

module.exports = new AdminController();
