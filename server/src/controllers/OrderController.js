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
    cancelOrder(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send('success'))
            .catch(err => {
                console.error('Lỗi khi update order: ', err);
                next(err);
            });
    }
}
module.exports = new OrderController();
