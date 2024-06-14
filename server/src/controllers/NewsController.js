const { multipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
const MainNews = require('../models/MainNews');
const SecondaryNews = require('../models/SecondaryNews');

class NewsController {
    async showNews(req, res, next) {
        try {
            const mainNews = await MainNews.find({});
            const secondaryNews = await SecondaryNews.find({});
            res.json({
                mainNews: multipleMongooseToObject(mainNews),
                secondaryNews: multipleMongooseToObject(secondaryNews),
            });
        } catch (error) {
            console.error('Error when retrieving news list:', error);
            next(error);
        }
    }

    showNewsDetails(req, res, next) {
        const newsId = req.params.id;
        MainNews.findById(newsId)
            .then(mainNews => {
                if (mainNews) {
                    res.json({ news: mongooseToObject(mainNews) });
                } else {
                    // Nếu không tìm thấy tin tức chính, thử tìm trong tin tức phụ
                    SecondaryNews.findById(newsId)
                        .then(secondaryNews => {
                            if (secondaryNews) {
                                res.json({ news: mongooseToObject(secondaryNews) });
                            } else {
                                // Nếu không tìm thấy tin tức phụ hoặc tin tức chính, trả về lỗi 404
                                res.status(404).json({ message: 'News not found' });
                            }
                        })
                        .catch(error => {
                            console.error('Error finding secondary news:', error);
                            next(error);
                        });
                }
            })
            .catch(error => {
                console.error('Error finding main news:', error);
                next(error);
            });
    }

    async createMainNews(req, res, next) {
        try {
            const formData = req.body;
            const news = new MainNews(formData);
            await news.save();
            res.send('Successfully created main news');
        } catch (error) {
            console.error('Error when creating main news:', error);
            next(error);
        }
    }

    async createSecondaryNews(req, res, next) {
        try {
            const formData = req.body;
            const news = new SecondaryNews(formData);
            await news.save();
            res.send('Successfully created secondary news');
        } catch (error) {
            console.error('Error when creating secondary news:', error);
            next(error);
        }
    }

    async storeMainNews(req, res, next) {
        try {
            const news = new MainNews(req.body);
            await news.save();
            res.redirect('/news');
        } catch (error) {
            console.error('Error when storing main news:', error);
            next(error);
        }
    }

    async storeSecondaryNews(req, res, next) {
        try {
            const news = new SecondaryNews(req.body);
            await news.save();
            res.redirect('/news');
        } catch (error) {
            console.error('Error when storing secondary news:', error);
            next(error);
        }
    }

    async editMainNews(req, res, next) {
        try {
            const mainNews = await MainNews.findById(req.params.id);
            if (!mainNews) {
                return res.status(404).json({ message: 'Main news not found' });
            }
            res.json({ mainNews: mongooseToObject(mainNews) });
        } catch (error) {
            console.error('Error when editing main news:', error);
            next(error);
        }
    }

    async editSecondaryNews(req, res, next) {
        try {
            const secondaryNews = await SecondaryNews.findById(req.params.id);
            if (!secondaryNews) {
                return res.status(404).json({ message: 'Secondary news not found' });
            }
            res.json({ secondaryNews: mongooseToObject(secondaryNews) });
        } catch (error) {
            console.error('Error when editing secondary news:', error);
            next(error);
        }
    }

    async updateMainNews(req, res, next) {
        try {
            const newsId = req.params.id;
            const updatedData = req.body;
            const updatedNews = await MainNews.findByIdAndUpdate(newsId, updatedData, { new: true });
            if (!updatedNews) {
                return res.status(404).json({ message: 'Main news not found' });
            }
            res.json({ message: 'Successfully updated main news', news: updatedNews });
        } catch (error) {
            console.error('Error when updating main news:', error);
            next(error);
        }
    }
    
    async updateSecondaryNews(req, res, next) {
        try {
            const newsId = req.params.id;
            const updatedData = req.body;
            const updatedNews = await SecondaryNews.findByIdAndUpdate(newsId, updatedData, { new: true });
            if (!updatedNews) {
                return res.status(404).json({ message: 'Secondary news not found' });
            }
            res.json({ message: 'Successfully updated secondary news', news: updatedNews });
        } catch (error) {
            console.error('Error when updating secondary news:', error);
            next(error);
        }
    }

    async deleteNews(req, res, next) {
        try {
            const { id, type } = req.params;
            let newsModel = null;

            if (type === 'main') {
                newsModel = MainNews;
            } else if (type === 'secondary') {
                newsModel = SecondaryNews;
            } else {
                return res.status(400).send('Invalid news type');
            }

            const result = await newsModel.deleteOne({ _id: id });
            if (result.deletedCount === 1) {
                res.send('Successfully deleted');
            } else {
                res.status(404).json({ message: 'News not found' });
            }
        } catch (error) {
            console.error('Error when deleting news:', error);
            next(error);
        }
    }    
}

module.exports = new NewsController();

