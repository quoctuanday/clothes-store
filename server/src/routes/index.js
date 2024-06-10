const adminRouter = require('./admin');
const productRouter = require('./products');
const bannerRouter = require('./banners');
const newsRouter = require('./news');
const authRouter = require('./auth');
const userRouter = require('./user');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const paymentRouter = require('./payment');

function route(app) {
    app.use('/payment', paymentRouter);
    app.use('/order', orderRouter);
    app.use('/cart', cartRouter);
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/banners', bannerRouter);
    app.use('/products', productRouter);
    app.use('/admin', adminRouter);
    app.use('/news', newsRouter);
}

module.exports = route;
