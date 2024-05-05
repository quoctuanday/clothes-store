const adminRouter = require('./admin');
const productRouter = require('./products');

function route(app) {
    app.use('/products', productRouter);
    app.use('/admin', adminRouter);
}

module.exports = route;
