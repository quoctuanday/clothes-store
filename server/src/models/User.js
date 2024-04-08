const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        userName: { type: String, maxLength: 255 },
        password: { type: String, maxLength: 255 },
        image: { type: String, maxLength: 255 },
        fullName: { type: String, maxLength: 255 },
        gender: { type: String, enum: ['Nam', 'Nữ'], maxLength: 255 },
        phone: { type: String, maxLength: 255 },
        email: { type: String, maxLength: 600 },
        address: { type: String, maxLength: 255 },
        role: {
            type: String,
            enum: ['Customer', 'Admin'],
            maxLength: 255,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', User);
