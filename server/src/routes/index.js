const adminRouter = require('./admin');
const productRouter = require('./products');
const bannerRouter = require('./banners');
const newsRouter = require('./news');

function route(app) {
    app.use('/banners', bannerRouter);
    app.use('/products', productRouter);
    app.use('/admin', adminRouter);
    app.use('/news', newsRouter);
}

module.exports = route;
