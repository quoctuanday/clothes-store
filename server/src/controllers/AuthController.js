const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

class AuthController {
    login(req, res, next) {
        const { email, password } = req.body;

        console.log('Login attempt with email:', email);

        User.findOne({ email })
            .exec()
            .then(user => {
                if (!user) {
                    console.log('User not found');

                    return res.status(401).json({ message: 'Unauthorized' });
                }

                console.log('User found:', user.email);

                return bcrypt.compare(password, user.password).then(match => {
                    if (!match) {
                        console.log('Password does not match');
                        return res
                            .status(401)
                            .json({ message: 'Unauthorized' });
                    }
                    if (user.block) {
                        console.log('User account has been locked');
                        return res
                            .status(403)
                            .json({ message: 'User account has been locked' });
                    }

                    req.session.userId = user._id;
                    console.log(req.session.userId);
                    res.json(user);
                });
            })
            .catch(error => {
                console.error('Error during login:', error);
                next(error);
            });
    }

    getUser(req, res, next) {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Session not found' });
        }

        User.findById(req.session.userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                res.json(user);
            })
            .catch(error => {
                console.error('Error during getUser:', error);
                next(error);
            });
    }

    registerData(req, res, next) {
        const formData = req.body;
        const { password } = formData; // Lấy mật khẩu từ formData

        bcrypt
            .hash(password, 10)
            .then(hashedPassword => {
                formData.password = hashedPassword;

                const user = new User(formData);
                return user.save();
            })
            .then(() => {
                res.send('Đăng ký thành công');
            })
            .catch(err => {
                console.error('Lỗi khi đăng ký: ', err);
                next(err);
            });
    }

    logOut(req, res, next) {
        const destroySessionPromise = new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if (err) {
                    console.error('Error destroying session:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        destroySessionPromise
            .then(() => {
                res.send('Logged out successfully');
            })
            .catch(error => {
                console.error('Error logging out:', error);
                res.status(500).send('Error logging out');
            });
    }
    resetPassword(req, res, next) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send('Email is required');
        }

        // Kiểm tra xem email tồn tại trong cơ sở dữ liệu
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return res.status(404).send('Email not found');
                }

                console.log('HÀM ĐÃ ĐƯỢC GỌI THÀNH CÔNG', email);
                const userId = user._id;
                console.log(userId);

                // Nếu email tồn tại, gửi email reset mật khẩu
                const transporter = nodemailer.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: 'da80d568f1abdb',
                        pass: 'ae3d38c7f3b30b',
                    },
                });

                const mailOptions = {
                    from: 'clothesshop@gmail.com',
                    to: email,
                    subject: 'Password Reset',
                    text: `Bạn nhận được thông báo này vì bạn (hoặc người khác) đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.\n\n
                    Vui lòng nhấp vào liên kết sau hoặc dán liên kết này vào trình duyệt của bạn để hoàn tất quá trình:\n\n
                           http://localhost:3000/newpassword/${userId}\n\n
                           Nếu bạn không thực hiện điều này cứ mặc kệ nó.\n`,
                };

                transporter
                    .sendMail(mailOptions)
                    .then(info => {
                        console.log('Email đã được gửi đi:', info.response);
                        res.send('Email đã được gửi đi: ' + info.response);
                    })
                    .catch(error => {
                        console.error('Error sending email:', error);
                        res.status(500).send(error.toString());
                    });
            })
            .catch(err => {
                console.error('Error finding user:', err);
                res.status(500).send(err.toString());
            });
    }

    updatePassword(req, res, next) {
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

    newpass(req, res, next) {
        const password = req.body.password;

        bcrypt
            .hash(password, 10)
            .then(hashedPassword => {
                return User.updateOne(
                    { _id: req.params.id },
                    { password: hashedPassword }
                );
            })
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
}

module.exports = new AuthController();
