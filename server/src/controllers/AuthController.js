const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const User = require('../models/User');
const { response } = require('express');
const bcrypt = require('bcrypt');

const sessions = {};
class AuthController {
    login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email }).exec()
            .then(user => {
                if (!user) {
                    // Nếu không tìm thấy người dùng, trả về lỗi 401 - Unauth
                    return res.status(401).json({
                        message: 'Unauth',
                    });
                }
    
                // Giải mã mật khẩu và so sánh với mật khẩu đã được mã hóa trong cơ sở dữ liệu
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) {
                            // Nếu mật khẩu không khớp, trả về lỗi 401 - Unauth
                            return res.status(401).json({
                                message: 'Unauth',
                            });
                        }
    
                        // Nếu mật khẩu khớp, tạo sessionId và lưu thông tin phiên vào sessions
                        const sessionId = Date.now().toString();
                        sessions[sessionId] = { sub: user._id };
    
                        // Thiết lập cookie với sessionId
                        res.setHeader(
                            'Set-Cookie',
                            `sessionId=${sessionId}; httpOnly; max-age=3600; path=/; domain=localhost`
                        );

                        // Trả về thông tin người dùng
                        res.json(user);
                    });
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                next(error);
            });
    }

    async getUser(req, res, next) {
        try {
            const session = sessions[req.cookies.sessionId];

            if (!session) {
                return res.status(401).json({
                    message: 'Session not found',
                });
            }

            const user = await User.findOne({ _id: session.sub }).exec();

            if (!user) {
                return res.status(401).json({
                    message: 'Unauth',
                });
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    registerData(req, res, next){
        const formData = req.body;
        const { password } = formData; // Lấy mật khẩu từ formData
    
        bcrypt.hash(password, 10)
            .then((hashedPassword) => {
                formData.password = hashedPassword;
    
                const user = new User(formData);
                return user.save();
            })
            .then(() => {
                res.send("Đăng ký thành công");
            })
            .catch((err) => {
                console.error('Lỗi khi đăng ký: ', err);
                next(err);
            });

    }



}



module.exports = new AuthController();
