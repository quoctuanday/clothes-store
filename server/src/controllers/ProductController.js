const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Product = require('../models/Product');

class ProductController {
    showProducts(req, res, next) {
        Product.find({ status: 'Chưa bán' })
            .then(products => {
                res.json({ products: multipleMongooseToObject(products) }); //
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra danh sách banner:', error);
                next(error);
            });
    }
    showProductDetails(req, res, next) {
        const productId = req.params.id;
        Product.findById(productId)
            .then(product => {
                res.json({ product: mongooseToObject(product) });
            })
            .catch(error => {
                console.error('Lỗi khi đưa ra chi tiet san pham:', error);
                next(error);
            });
    }
}

module.exports = new ProductController();
