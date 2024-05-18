const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const User = require('../models/User');
const { response } = require('express');
const sessions = {};
class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email, password }).exec();

            if (!user) {
                return res.status(401).json({
                    message: 'Unauth',
                });
            }

            const sessionId = Date.now().toString();
            sessions[sessionId] = { sub: user._id };
            res.setHeader(
                'Set-Cookie',
                `sessionId=${sessionId}; httpOnly; max-age=3600;path=/; domain=localhost`
            ).json(user);
        } catch (error) {
            next(error);
        }
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
}

module.exports = new AuthController();
