const bcrypt = require('bcrypt');
const User = require('../models/User');

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
}

module.exports = new AuthController();
