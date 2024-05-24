const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const User = require('../models/User');
const Cart = require('../models/Cart');
const CartItems = require('../models/CartItems');

class UserController {
    updateProfile(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(result => {
                if (result.nModified === 0) {
                    return res.status(404).json({
                        message: 'User not found or no changes made.',
                    });
                }
                res.status(200).json({
                    message: 'Profile updated successfully.',
                });
            })
            .catch(error => {
                next(error);
            });
    }

    addCart = (req, res, next) => {
        const userId = req.session.userId;
        console.log('Session userId:', userId); // Logging userId

        if (!userId) {
            console.log('Session not found'); // Log if session not found
            return res.json({
                message: 'Phiên không được tìm thấy',
            });
        }

        Cart.findOne({ userId })
            .then(cart => {
                console.log('Found cart:', cart); // Logging cart

                if (!cart) {
                    // If no cart is found, create a new one
                    const newCart = new Cart({ userId });
                    return newCart.save();
                }

                return cart;
            })
            .then(cart => {
                if (!cart) {
                    return Promise.reject(new Error('Cart not created'));
                }

                const data = req.body;
                data.cartId = cart._id;

                const cartItem = new CartItems(data);
                return cartItem.save();
            })
            .then(savedCartItem => {
                console.log('Saved cart item:', savedCartItem); // Logging saved cart item
                res.status(200).json({
                    message: 'Sản phẩm đã được thêm vào giỏ hàng',
                });
            })
            .catch(err => {
                if (err.message === 'Cart not created') {
                    console.error('Error creating cart'); // Log cart creation error
                    return res.status(500).json({
                        message: 'Đã xảy ra lỗi khi tạo giỏ hàng',
                    });
                }

                console.error('Error:', err); // Logging other errors
                res.status(500).json({
                    message: 'Đã xảy ra lỗi',
                });
            });
    };
}

module.exports = new UserController();
