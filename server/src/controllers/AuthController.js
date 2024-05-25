const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');

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
    resetPassword(req, res, next){
        alert('Calling resetPassword function');  

        const transporter = nodemailer.createTransport({
            
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'da80d568f1abdb', // Thay bằng username của bạn trên Mailtrap
                pass: 'ae3d38c7f3b30b'  // Thay bằng password của bạn trên Mailtrap
            }
        });

        // Thiết lập email
        const mailOptions = {
            from: 'clothesshop@gmail.com', // Địa chỉ email gửi
            to: 'letheha6@gmail.com',     // Địa chỉ email nhận
            subject: 'Password Reset',     // Tiêu đề email
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/newpassword/token\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        // Gửi email
        transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Email đã được gửi đi:', info.response);
            res.send('Email đã được gửi đi: ' + info.response);
        })
        .catch(error => {
            console.error('Error sending email:', error);
            res.status(500).send(error.toString());
        });
    
    }
}

        

module.exports = new AuthController();
