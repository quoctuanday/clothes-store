const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        productName: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600, required: true },
        image: { type: String, maxLength: 255 },
        price: { type: Number, maxLength: 255 },
        branch: { type: String, maxLength: 255, required: true },
        material: { type: String, maxLength: 255 },
        color: { type: String, maxLength: 255 },
        gender: { type: String, enum: ['Nam', 'Nữ'], maxLength: 255 },
        size: { type: String, maxLength: 255 },
        type: { type: String, maxLength: 600 },
        status: { type: String, maxLength: 255 },
    },
    { timestamps: true }
);

Product.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Product', Product);
