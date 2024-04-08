const mongoose = require('mongoose');
const Product = require('./Product');
const Order = require('./Order');

const Schema = mongoose.Schema;

const OrderDetail = new Schema(
    {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: Order },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product },
        quantity: { type: Number, maxLength: 255 },
        unitPrice: { type: Number, maxLength: 255 },
        discount: { type: Number, maxLength: 255 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('OrderDetail', OrderDetail);
