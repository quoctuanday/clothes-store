const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Banner = new Schema(
    {
        image: { type: String, maxLength: 255 },
        targetUrl: { type: String, maxLength: 255 },
        startDate: { type: Number, maxLength: 255 },
        endDate: { type: Number, maxLength: 255 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Banner', Banner);
