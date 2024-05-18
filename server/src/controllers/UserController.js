const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const User = require('../models/User');

const sessions = {};
class UserController {
    updateProfile(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(result => {
                if (result.nModified === 0) {
                    return res.status(404).json({
                        message: 'User not found or no changes made.',
                    });
                }
                // Trả về phản hồi thành công
                res.status(200).json({
                    message: 'Profile updated successfully.',
                });
            })
            .catch(error => {
                // Xử lý lỗi
                next(error);
            });
    }
}
module.exports = new UserController();
