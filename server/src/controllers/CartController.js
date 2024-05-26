const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const User = require('../models/User');
const Cart = require('../models/Cart');
const CartItems = require('../models/CartItems');

class CartController {
    showItems(req, res, next) {
        const userId = req.session.userId;

        if (!userId) {
            return res.json({
                message: 'Phiên không được tìm thấy',
            });
        }
        Cart.findOne({ userId }).then(cart => {
            if (!cart) {
                return res.json({
                    message: 'Giỏ hàng không được tìm thấy',
                });
            }

            const cartId = cart._id;
            CartItems.find({ cartId })
                .populate('productId')
                .then(cartItem => {
                    if (!cartItem) {
                        return res.json({
                            message:
                                'Không tìm được sản phẩm nào trong giỏ hàng',
                        });
                    }

                    res.json({ cartItem: multipleMongooseToObject(cartItem) });
                });
        });
    }
    removeItems(req, res, next) {
        CartItems.deleteOne({ _id: req.params.id })
            .then(() => res.send('Remove successfully'))
            .catch(next);
    }
    showOrderDetails(req, res, next) {
        const cartItemId = req.params.id;
        CartItems.findOne({ _id: cartItemId })
            .populate('productId')
            .then(cartItem => {
                res.json({ cartItem: mongooseToObject(cartItem) });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra chi tiet đơn hàng:', error);
                next(error);
            });
    }
}

module.exports = new CartController();
