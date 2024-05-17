// SecondaryNews.js
const mongoose = require('mongoose');

const secondaryNewsSchema = new mongoose.Schema({
  newsName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

const SecondaryNews = mongoose.model('secondary_news', secondaryNewsSchema);

module.exports = SecondaryNews;
