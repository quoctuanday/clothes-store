const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        productName: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600, required: true },
        image: { type: String, maxLength: 255 },
        price: { type: Number, maxLength: 255 },
        status: { type: String, maxLength: 255 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', Product);
