const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Banner = require('../models/Banner');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
class OrderController {
    showOrder(req, res, next) {
        const userId = req.session.userId;
        console.log(userId);

        Order.find({ userId })
            .populate('productId')
            .then(orders => {
                res.json({
                    orders: multipleMongooseToObject(orders),
                });
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                next(err);
            });
    }

    showOrdersUser(req, res, next) {
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

    cancelOrder(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(err => {
                console.error('Lỗi khi update order: ', err);
                next(err);
            });
    }
    updateOrder(req, res, next) {
        const orderId = req.params.id;
        const newStatus = req.body.status;
        console.log(orderId);

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
                res.send('succes');
            })
            .catch(err => {
                console.error('Lỗi khi cập nhật đơn hàng: ', err);
                next(err);
            });
    }
}
module.exports = new OrderController();
