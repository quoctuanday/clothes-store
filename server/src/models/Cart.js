const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const User = require('./User');

const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    },
    { timestamps: true }
);

Cart.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Cart', Cart);
