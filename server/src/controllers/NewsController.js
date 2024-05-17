const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const MainNews = require('../models/MainNews');
const SecondaryNews = require('../models/SecondaryNews');

class NewsController {
    showNews(req, res, next) {
        Promise.all([
            MainNews.find({}), // Fetch all main news
            SecondaryNews.find({}) // Fetch all secondary news
        ])
        .then(([mainNews, secondaryNews]) => {
            res.json({
                mainNews: multipleMongooseToObject(mainNews),
                secondaryNews: multipleMongooseToObject(secondaryNews)
            });
        })
        .catch(error => {
            console.error('Lỗi khi đưa ra danh sách tin tức:', error);
            next(error);
        });
    }

    showNewsDetails(req, res, next) {
        const newsId = req.params.id;
        SecondaryNews.findById(newsId)
            .then(news => {
                if (!news) {
                    res.status(404).json({ message: 'News not found' });
                } else {
                    res.json({ news: mongooseToObject(news) });
                }
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra chi tiết tin tức:', error);
                next(error);
            });
    }
}

module.exports = new NewsController();
