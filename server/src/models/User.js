const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

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

User.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('User', User);
