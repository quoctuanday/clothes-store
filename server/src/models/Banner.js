const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Banner = new Schema(
    {
        image: { type: String, maxLength: 255 },
        title: { type: String, maxLength: 255 },
        decription: { type: String, maxLength: 255 },
        targetUrl: { type: String, maxLength: 255 },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Banner', Banner);
