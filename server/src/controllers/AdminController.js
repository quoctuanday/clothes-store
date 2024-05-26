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
                    res.render('admin/home', {
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

    showCustomers(req, res, next) {
        User.find({})
            .then(users => {
                res.render('admin/customers', {
                    users: multipleMongooseToObject(users),
                });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra danh sách khách hàng:', error);
                next(error);
            });
    }

    showOrders(req, res, next) {
        Order.find({ userId: req.params.id })
            .populate('productId') // Lấy thông tin sản phẩm cho mỗi đơn hàng
            .then(orders => {
                res.render('admin/orders', {
                    orders: multipleMongooseToObject(orders),
                });
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                next(err);
            });
    }

    showProducts(req, res, next) {
        Product.find({ quantityInStock: { $gt: 0 } })
            .then(products => {
                res.render('admin/products', {
                    products: multipleMongooseToObject(products),
                });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra danh sách sản phẩm:', error);
                next(error);
            });
    }

    showBanners(req, res, next) {
        Banner.find({})
            .then(banners => {
                res.render('admin/banners', {
                    banners: multipleMongooseToObject(banners),
                });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra danh sách banner:', error);
                next(error);
            });
    }

    showNews(req, res, next) {
        Promise.all([
            MainNews.find({}), // Fetch all main news
            SecondaryNews.find({}), // Fetch all secondary news
        ])
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

    deleteCustomers(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => {
                console.error('Lỗi khi xóa người dùng: ', err);
                next(err);
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

    deleteProducts(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => {
                console.error('Lỗi khi xóa sản phẩm: ', err);
                next(err);
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
        const newStatus = req.body.action;

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
                                // Cập nhật trạng thái của sản phẩm thành "đã bán"
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
                    return Promise.resolve(null); // Không cần cập nhật sản phẩm
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

    createProduct(req, res, next) {
        res.render('admin/create-product');
    }

    createBanner(req, res, next) {
        res.render('admin/create-banner');
    }

    createMainNews(req, res, next) {
        res.render('admin/create-main-news');
    }

    createSecondaryNews(req, res, next) {
        res.render('admin/create-secondary-news');
    }

    storeProduct(req, res, next) {
        const formData = req.body;
        formData.status = 'Chưa bán';
        formData.quantitySold = 0;
        const product = new Product(formData);
        product
            .save()
            .then(() => res.redirect('/admin/products'))
            .catch(err => {
                console.error('Lỗi khi tạo sản phẩm: ', err);
                next(err);
            });
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

    storeBanner(req, res, next) {
        const formData = req.body;
        const banner = new Banner(formData);
        banner
            .save()
            .then(() => res.redirect('/admin/banners'))
            .catch(err => {
                console.error('Lỗi khi tạo sản phẩm: ', err);
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

    editProduct(req, res, next) {
        Product.findById(req.params.id).then(product =>
            res.render('admin/edit-product', {
                product: mongooseToObject(product),
            })
        );
    }

    updateOrder(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(err => {
                console.error('Lỗi khi update order: ', err);
                next(err);
            });
    }

    updateProduct(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/products'))
            .catch(err => {
                console.error('Lỗi khi update product: ', err);
                next(err);
            });
    }

    updateBanner(req, res, next) {
        Banner.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/banners'))
            .catch(err => {
                console.error('Lỗi khi update banner: ', err);
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

    editBanner(req, res, next) {
        Banner.findById(req.params.id).then(banner =>
            res.render('admin/edit-banner', {
                banner: mongooseToObject(banner),
            })
        );
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
