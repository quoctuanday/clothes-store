const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Banner = new Schema(
    {
        image: { type: String, maxLength: 255 },
        title: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 255 },
        targetUrl: { type: String, maxLength: 255 },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    { timestamps: true }
);

Banner.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Banner', Banner);
