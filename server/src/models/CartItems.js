const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Product = require('./Product');
const Cart = require('./Cart');

const Schema = mongoose.Schema;

const CartItems = new Schema(
    {
        cartId: { type: mongoose.Schema.Types.ObjectId, ref: Cart },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product },
        quantity: { type: Number, maxLength: 255 },
    },
    { timestamps: true }
);

CartItems.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('CartItems', CartItems);
