// MainNews.js
const mongoose = require('mongoose');

const mainNewsSchema = new mongoose.Schema({
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

const MainNews = mongoose.model('main_news', mainNewsSchema);

module.exports = MainNews;
