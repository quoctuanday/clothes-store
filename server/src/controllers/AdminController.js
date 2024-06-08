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

        Promise.all([
            productCountPromise,
            bannerCountPromise,
            userCountPromise,
            newsCountPromise,
            soldPromise,
        ])
            .then(
                ([
                    productCount,
                    bannerCount,
                    userCount,
                    newsCount,
                    soldResult,
                ]) => {
                    const soldCount =
                        soldResult.length > 0 ? soldResult[0].totalSold : 0;
                    res.json({
                        productCount,
                        soldCount,
                        bannerCount,
                        userCount,
                        newsCount,
                    });
                }
            )
            .catch(error => {
                console.error('Lỗi khi đếm số lượng sản phẩm:', error);
                next(error);
            });
    }

    showOrders(req, res, next) {
        Order.find({ userId: req.params.id })

            .then(orders => {
                const populatedOrders = orders.map(order => {
                    return OrderDetail.find({ orderId: order._id })
                        .populate('productId')
                        .then(orderDetails => {
                            const populatedOrder = {
                                _id: order._id,
                                userId: order.userId,
                                status: order.status,
                                totalAmount: order.totalAmount,
                                paymentStatus: order.paymentStatus,
                                createdAt: order.createdAt,
                                updatedAt: order.updatedAt,
                                products: orderDetails.map(detail => ({
                                    productId: detail.productId,
                                    quantity: detail.quantity,
                                    unitPrice: detail.unitPrice,
                                    discount: detail.discount,
                                })),
                            };
                            return populatedOrder;
                        });
                });

                Promise.all(populatedOrders).then(populatedOrders => {
                    res.json({
                        orders: populatedOrders,
                    });
                });
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                next(err);
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

    handleFormActions(req, res, next) {
        const orderId = req.body.orderId;
        const newStatus = req.body.status;

        Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true })
            .then(updatedOrder => {
                // Kiểm tra nếu trạng thái mới của đơn hàng là "đã giao"
                if (newStatus === 'Đã giao') {
                    // Tìm chi tiết đơn hàng liên quan đến orderId
                    return OrderDetail.findOne({ orderId: orderId });
                } else {
                    return Promise.resolve(null); // Không cần cập nhật sản phẩm
                }
            })
            .then(orderDetail => {
                // Kiểm tra nếu tìm thấy chi tiết đơn hàng và trạng thái mới của đơn hàng là "đã giao"
                if (orderDetail && newStatus === 'Đã giao') {
                    // Lấy quantity từ orderDetail
                    const quantity = orderDetail.quantity;

                    // Tìm sản phẩm liên quan đến đơn hàng
                    return Product.findOne({ _id: orderDetail.productId }).then(
                        product => {
                            // Kiểm tra nếu tìm thấy sản phẩm
                            if (product) {
                                product.quantitySold += quantity;
                                product.quantityInStock -= quantity;
                                // Lưu lại thay đổi trạng thái của sản phẩm
                                return product.save();
                            } else {
                                return Promise.resolve(null); // Không cần cập nhật sản phẩm
                            }
                        }
                    );
                } else {
                    return Promise.resolve(null);
                }
            })
            .then(() => {
                res.redirect('back');
            })
            .catch(err => {
                console.error('Lỗi khi cập nhật đơn hàng: ', err);
                next(err);
            });
    }

    createMainNews(req, res, next) {
        res.render('admin/create-main-news');
    }

    createSecondaryNews(req, res, next) {
        res.render('admin/create-secondary-news');
    }

    createOrder(req, res, next) {
        const formData = req.body;

        Product.findById(formData.productId)
            .then(product => {
                if (!product) {
                    throw new Error('Không tìm thấy sản phẩm');
                }
                // Lấy giá của sản phẩm và gán cho formData.unitPrice
                formData.unitPrice = product.price;
                formData.discount = 0;

                // Thiết lập các thuộc tính cho đơn hàng
                formData.status = 'Chờ xử lí';
                formData.paymentStatus = 'Chưa thanh toán';
                formData.totalAmount =
                    formData.quantity * formData.unitPrice -
                    (formData.unitPrice * formData.discount) / 100;

                // Tạo đối tượng Order từ formData
                const order = new Order({
                    userId: formData.userId,
                    productId: formData.productId,
                    status: formData.status,
                    totalAmount: formData.totalAmount,
                    paymentStatus: formData.paymentStatus,
                });

                return order.save();
            })
            .then(savedOrder => {
                // Lưu orderId của order vào biến createdOrderId
                const createdOrderId = savedOrder._id;

                // Tạo đối tượng OrderDetail từ formData và orderId của order
                const orderDetail = new OrderDetail({
                    orderId: createdOrderId,
                    productId: formData.productId,
                    quantity: formData.quantity,
                    unitPrice: formData.unitPrice,
                    discount: formData.discount,
                });

                return orderDetail.save();
            })
            .then(() => res.json('Tạo order và order detail thành công'))
            .catch(err => {
                console.error('Lỗi khi tạo order hoặc order detail', err);
                next(err);
            });
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

    updateOrder(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(err => {
                console.error('Lỗi khi update order: ', err);
                next(err);
            });
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
