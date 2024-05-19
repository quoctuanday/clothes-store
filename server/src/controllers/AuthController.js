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
}

module.exports = new AuthController();
