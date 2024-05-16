const adminRouter = require('./admin');
const productRouter = require('./products');
const bannerRouter = require('./banners');

function route(app) {
    app.use('/banners', bannerRouter);
    app.use('/products', productRouter);
    app.use('/admin', adminRouter);
}

module.exports = route;
