const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');

const Schema = mongoose.Schema;

const Order = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product },
        status: { type: String, maxLength: 255 },
        totalAmount: { type: Number, maxLength: 255 },
        paymentStatus: { type: String, maxLength: 255 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', Order);
