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
        console.log(req.session.userId);

        if (!userId) {
            return res.json({
                message: 'Phiên không được tìm thấy',
            });
        }

        Cart.findOne({ userId })
            .then(cart => {
                if (!cart) {
                    return res.json({
                        message: 'Giỏ hàng không được tìm thấy',
                    });
                }

                const data = req.body;
                data.cartId = cart._id;

                const cartItem = new CartItems(data);
                return cartItem.save();
            })
            .then(() => {
                return res.status(200).json({
                    message: 'Sản phẩm đã được thêm vào giỏ hàng',
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({
                    message: 'Đã xảy ra lỗi',
                });
            });
    };
}
module.exports = new UserController();
