const mongoose = require('mongoose');
const Product = require('./Product');

const Schema = mongoose.Schema;

const ProductDetail = new Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product },
        branch: { type: String, maxLength: 255, required: true },
        material: { type: String, maxLength: 255, required: true },
        color: { type: String, maxLength: 255 },
        gender: { type: String, enum: ['Nam', 'Nữ'], maxLength: 255 },
        size: { type: Number, maxLength: 255 },
        type: { type: String, maxLength: 600 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ProductDetail', ProductDetail);
