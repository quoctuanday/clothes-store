const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Banner = require('../models/Banner');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

class AdminController {
    showHome(req, res, next) {
        const productCountPromise = Product.countDocuments({});
        const bannerCountPromise = Banner.countDocuments({});
        const userCountPromise = User.countDocuments({});
        const soldPromise = Product.countDocuments({ status: 'sold' });

        Promise.all([
            productCountPromise,
            soldPromise,
            bannerCountPromise,
            userCountPromise,
        ])
            .then(([productCount, soldCount, bannerCount, userCount]) => {
                res.render('admin/home', {
                    productCount,
                    soldCount,
                    bannerCount,
                    userCount,
                });
            })
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
            .then(orders => {
                // Lấy danh sách orderId từ các đơn hàng tìm thấy
                const orderIds = orders.map(order => order._id);

                // Tìm chi tiết đơn hàng dựa trên danh sách orderId
                OrderDetail.find({ orderId: { $in: orderIds } })
                    .then(orderDetails => {
                        // Lấy danh sách productId từ các chi tiết đơn hàng tìm thấy
                        const productIds = orderDetails.map(
                            orderDetail => orderDetail.productId
                        );

                        // Tìm thông tin sản phẩm dựa trên danh sách productId
                        Product.find({ _id: { $in: productIds } })
                            .then(products => {
                                // Gửi kết quả đến giao diện
                                res.render('admin/orders', {
                                    orders: multipleMongooseToObject(orders),
                                    orderDetails:
                                        multipleMongooseToObject(orderDetails),
                                    products:
                                        multipleMongooseToObject(products),
                                });
                            })
                            .catch(err => {
                                console.error('Error fetching products:', err);
                                // Xử lý lỗi nếu có
                                next(err);
                            });
                    })
                    .catch(err => {
                        console.error('Error fetching order details:', err);
                        // Xử lý lỗi nếu có
                        next(err);
                    });
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                // Xử lý lỗi nếu có
                next(err);
            });
    }

    showProducts(req, res, next) {
        Product.find({})
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

    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.deleteOne({ _id: { $in: req.body.userIds } }) //Xóa tất cả những item có id giống trong list req.body.userIds
                    .then(() => res.redirect('back'))
                    .catch(err => {
                        console.error('Lỗi khi xóa người dùng: ', err);
                        next(err);
                    });
                break;
            default:
                res.json({ message: 'Invalid action' });
        }
    }

    createProduct(req, res, next) {
        res.render('admin/create-product');
    }

    createBanner(req, res, next) {
        res.render('admin/create-banner');
    }

    storeProduct(req, res, next) {
        if (req.body) res.json('ton tai');
        else res.json('ko ton tai');
        // const product = new Product(formData);
        // product
        //     .save()
        //     .then(() => res.redirect('/admin/products'))
        //     .catch(err => {
        //         console.error('Lỗi khi tạo sản phẩm: ', err);
        //         next(err);
        //     });
    }

    editProduct(req, res, next) {
        Product.findById(req.params.id).then(product =>
            res.render('admin/edit-product', {
                product: mongooseToObject(product),
            })
        );
    }

    updateProduct(req, res, next) {
        res.json(req.body);
        // Course.updateOne({ _id: req.params.id }, req.body)
        //     .then(() => res.redirect('/admin/products'))
        //     .catch(err => {
        //         console.error('Lỗi khi update product: ', err);
        //         next(err);
        //     });
    }

    editBanner(req, res, next) {
        Banner.findById(req.params.id).then(banner =>
            res.render('admin/edit-banner', {
                banner: mongooseToObject(banner),
            })
        );
    }
}

module.exports = new AdminController();
